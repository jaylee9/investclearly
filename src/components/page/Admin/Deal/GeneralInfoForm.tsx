import { useForm } from 'react-hook-form';
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

const validationSchema = z.object({
  dealTitle: z.string().min(1),
  dealSponsor: z.string().min(1),
  assetClass: z.string().min(1),
  description: z.string().min(1),
  closeDate: z.string().min(1),
  holdPeriod: z.string().min(1),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface Tag {
  name: string;
  id?: number;
}

const GeneralInfoForm = () => {
  const classes = useGeneralInfoFormStyles();
  const [tagSelectorValue, setTagSelectorValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(tagSelectorValue);
  const [showVariants, setShowVariants] = useState(false);

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
  const dirtyTag = tag.name !== defaultTag.name && tag.id !== defaultTag.id;

  const handleClearTag = () => {
    setTag(defaultTag);
  };

  const handleChooseSponsor = (event: React.MouseEvent, { name, id }: Tag) => {
    event.stopPropagation();
    handleClose();
    setTag({ name, id });
    setTagSelectorValue('');
  };

  const { handleSubmit, register, watch } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Box sx={classes.formWrapper}>
        <Input
          register={register('dealTitle')}
          value={watch('dealTitle')}
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
              {data?.sponsors.map(sponsor => (
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
      </Box>
    </form>
  );
};

export default GeneralInfoForm;
