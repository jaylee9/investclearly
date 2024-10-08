import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { useGeneralInfoFormStyles } from './styles';
import Input from '@/components/common/Input';
import { GetAllSponsorsResponse, getAllSponsors } from '@/actions/sponsors';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import Loading from '@/components/common/Loading';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import TagSelector from '@/components/common/TagSelector';
import { useQuery } from 'react-query';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import FileUploader, { FileType } from '@/components/common/FileUploader';
import CustomTextArea from '@/components/common/TextArea';
// import CustomDateRangePicker from '@/components/common/DateRangePicker';
import Button from '@/components/common/Button';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { PartialEditDealInterface, editDeal } from '@/actions/deals';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { LocationInterface } from '@/backend/services/locations/interfaces/location.interface';
import { omit } from 'lodash';

const validationSchema = z.object({
  vanityName: z.string().min(1),
  assetClass: z.string().min(1),
  description: z.string(),
  // closeDate: z.string().min(1),
  // holdPeriod: z.string().min(1),
  isDealPublished: z.boolean(),
  street1: z.string().optional(),
  street2: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  stateOrCountry: z.string().optional(),
  stateOrCountryDescription: z.string().optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface Tag {
  name: string;
  id?: number;
}

interface GeneralInfoFormProps {
  onClose: (e: MouseEvent | object) => void;
  refetch: () => void;
  deal: DealInterface;
  setDeal: (value: DealInterface) => void;
}

const GeneralInfoForm = ({
  onClose,
  refetch,
  deal,
  setDeal,
}: GeneralInfoFormProps) => {
  const classes = useGeneralInfoFormStyles();

  const [tagSelectorValue, setTagSelectorValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(tagSelectorValue);
  const [showVariants, setShowVariants] = useState(false);
  const [choosedFile, setChoosedFile] = useState<File | undefined>(undefined);
  const [fileToDelete, setFileToDelete] = useState<number | undefined>(
    undefined
  );
  const [defaultImage, setDefaultImage] = useState('');
  const [isUpdateDealLoading, setIsUpdateDealLoading] = useState(false);

  const onUpload = (file: File) => {
    setChoosedFile(file);
  };

  const onDelete = () => {
    setDefaultImage('');
    setChoosedFile(undefined);
    if (deal.attachments.length) {
      setFileToDelete(deal.attachments?.[0].id);
    }
  };

  const handleOpen = () => setShowVariants(true);
  const handleClose = () => setShowVariants(false);

  useEffect(() => {
    const debouncedSave = debounce(newValue => {
      setDebouncedValue(newValue);
    }, 500);
    debouncedSave(tagSelectorValue);
    return () => {
      debouncedSave.cancel();
    };
  }, [tagSelectorValue]);

  const fetchSponsors = async () => {
    const filters = { search: debouncedValue, page: 1, pageSize: 5 };
    return (await getAllSponsors(filters)) as GetAllSponsorsResponse;
  };

  const { data, isLoading } = useQuery<GetAllSponsorsResponse>(
    ['sponsors', debouncedValue],
    fetchSponsors
  );

  const defaultTag = { name: '', id: undefined };
  const [tag, setTag] = useState<Tag>(defaultTag);

  const handleClearTag = () => {
    setTag(defaultTag);
  };

  const handleChooseSponsor = (event: React.MouseEvent, { name, id }: Tag) => {
    event.stopPropagation();
    handleClose();
    setTag({ name, id });
    setTagSelectorValue('');
  };

  const { handleSubmit, register, watch, control, setValue } =
    useForm<ValidationSchema>({
      resolver: zodResolver(validationSchema),
    });
  const onSubmit = handleSubmit(async data => {
    setIsUpdateDealLoading(true);
    const formattedDeal = omit(deal, [
      'locations',
      'reviewsCount',
      'avgTotalRating',
      'isInInvestments',
      'isInBookmarks',
      'sponsor',
      'fileDate',
      'preferredReturn',
      'attachments',
    ]);
    const response = await editDeal({
      payload: {
        ...formattedDeal,
        ...data,
        id: deal.id,
        // holdPeriod: +data.holdPeriod,
        attachmentsIdsToDelete: fileToDelete,
        photoOfTheObjects: choosedFile,
        sponsorId: tag.id || 'none',
        fees: deal.fees || 'none',
        equityMultiple: deal.equityMultiple || 'none',
        targetIRR: deal.targetIRR || 'none',
        actualIRR: deal.actualIRR || 'none',
      } as PartialEditDealInterface & { id: number },
    });
    if (!('error' in response)) {
      setDeal(response);
      await refetch();
    }
    setIsUpdateDealLoading(false);
  });

  const assetClassOptions = Object.values(AssetClasses).map(item => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    const locationFields: (keyof LocationInterface)[] = [
      'street1',
      'street2',
      'city',
      'zipCode',
      'stateOrCountryDescription',
    ];
    if (deal?.locations && deal?.locations?.length > 0) {
      const location = deal.locations[0];

      locationFields.forEach(field => {
        setValue(field as keyof ValidationSchema, location[field] as string);
      });
    }
    if (deal) {
      Object.keys(validationSchema.shape).forEach(key => {
        const keyOfDeal = key as keyof DealInterface;
        if (keyOfDeal && deal[keyOfDeal] !== undefined) {
          const value = deal[keyOfDeal];
          if (typeof value === 'string' || typeof value === 'number') {
            setValue(key as keyof ValidationSchema, String(value));
          }
          if (typeof value === 'boolean') {
            setValue(key as keyof ValidationSchema, value);
          }
        }
      });

      if (deal.attachments.length) setDefaultImage(deal.attachments?.[0].path);
      if (deal.sponsor) {
        if (deal.sponsor.id && deal.sponsor.legalName)
          setTag({ id: deal.sponsor.id, name: deal.sponsor.legalName });
      }
    }
  }, [deal, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Box sx={classes.formWrapper}>
        <Input
          register={register('vanityName')}
          value={watch('vanityName')}
          topLabel="Deal Vanity Name"
          placeholder="Vanity Name"
        />
        <Box>
          <Typography variant="caption" fontWeight={600}>
            Deal Sponsor
          </Typography>
          <TagSelector
            inputValue={tagSelectorValue}
            onChange={setTagSelectorValue}
            activeTag={tag.name}
            onClearTags={handleClearTag}
            open={showVariants}
            handleClose={handleClose}
            handleOpen={handleOpen}
            isSearch={false}
            variant="outlined"
            placeholder="Legal Name"
          >
            <Box sx={classes.tagSelectorContent}>
              {isLoading && <Loading />}
              {!data?.sponsors?.length && !isLoading && (
                <Typography variant="caption" sx={classes.noResults}>
                  No results found
                </Typography>
              )}
              {data?.sponsors?.map(sponsor => (
                <Box
                  key={sponsor.id}
                  onClick={event =>
                    handleChooseSponsor(event, {
                      name: sponsor.legalName as string,
                      id: sponsor.id,
                    })
                  }
                  sx={classes.sponsorVariantWrapper}
                >
                  <PlaceholderImage
                    src={sponsor.businessAvatar as string}
                    alt="sponsor image"
                    defaultImage={DEFAULT_SPONSOR_IMAGE}
                    width={48}
                    height={48}
                    style={{ borderRadius: '1230px', maxHeight: '48px' }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {sponsor.legalName}
                    </Typography>
                    <Typography variant="caption" sx={classes.sponsorRating}>
                      <i className="icon-Star"></i>
                      <span>{sponsor.avgTotalRating}</span>
                      <span>({sponsor.reviewsCount})</span>
                    </Typography>
                    <Typography variant="caption" sx={classes.address}>
                      {sponsor.address}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </TagSelector>
        </Box>
        <Controller
          control={control}
          name="assetClass"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              options={assetClassOptions}
              variant={SelectVariant.Dark}
              onChange={onChange}
              value={value || ''}
              topLabel="Asset Class"
              placeholder="Class"
            />
          )}
        />
        <Input
          placeholder="123 First street"
          topLabel="Address line 1"
          register={register('street1')}
          value={watch('street1')}
          showClearOption={false}
        />
        <Input
          topLabel="Address line 2"
          register={register('street2')}
          value={watch('street2')}
          showClearOption={false}
        />
        <Box sx={classes.doubleInputsWrapper}>
          <Input
            placeholder="New York"
            topLabel="City"
            register={register('city')}
            value={watch('city')}
            showClearOption={false}
          />
          <Input
            placeholder="Type"
            topLabel="ZIP Code"
            register={register('zipCode')}
            value={watch('zipCode')}
            showClearOption={false}
            type="number"
          />
        </Box>
        <Box sx={classes.doubleInputsWrapper}>
          <Input
            placeholder="USA"
            topLabel="State or Country"
            register={register('stateOrCountryDescription')}
            value={watch('stateOrCountryDescription')}
            showClearOption={false}
          />
        </Box>
        <Box>
          <Typography variant="caption" fontWeight={600}>
            Primary Deal Image
          </Typography>
          <FileUploader
            type={FileType.SINGLE_IMAGE}
            onUpload={onUpload}
            onDelete={onDelete}
            defaultImage={defaultImage}
          />
        </Box>
        <CustomTextArea
          placeholder="Tell us more about your deal"
          topLabel="Description"
          register={register('description')}
          value={watch('description')}
          height="140px"
        />
        {/* <Box sx={classes.doubleInputsWrapper}>
          <CustomDateRangePicker
            topLabel="Close Date"
            control={control}
            name="closeDate"
            placeholder="mm/dd/yyyy"
          />
          <Input
            register={register('holdPeriod')}
            topLabel="Hold Period, years"
            placeholder="1"
            showClearOption={false}
            type="number"
            value={watch('holdPeriod')}
          />
        </Box> */}
        <Controller
          control={control}
          name="isDealPublished"
          render={({ field: { onChange, value } }) => (
            <CustomCheckbox
              onChange={onChange}
              checked={value}
              label="Published"
              customStyles={{ width: 'fit-content' }}
            />
          )}
        />
      </Box>
      <Box sx={classes.buttonsWrapper}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdateDealLoading}>
          Save
        </Button>
      </Box>
    </form>
  );
};

export default GeneralInfoForm;
