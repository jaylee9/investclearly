import ProfilePictureUploader, {
  ProfilePictureUploaderVariant,
} from '@/components/common/ProfilePictureUploader';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import { Box } from '@mui/material';
import { useSponsorDetailsFormStyles } from './styles';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { Regions } from '@/backend/constants/enums/regions';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import CustomTextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import { PartialCreateSponsorInterface } from '@/actions/sponsors';

const isBrowser =
  typeof window !== 'undefined' && typeof window.File !== 'undefined';

const validationSchema = z.object({
  businessAvatar: isBrowser ? z.instanceof(File) : z.any(),
  vanityName: z.string().optional(),
  legalName: z.string().min(1, 'Required field'),
  street1: z.string().min(1, 'Required field'),
  street2: z.string(),
  city: z.string().min(1, 'Required field'),
  zipCode: z.string().min(1, 'Required field'),
  stateOrCountry: z.string().min(1, 'Required field'),
  stateOrCountryDescription: z.string().min(1, 'Required field'),
  regions: z.array(z.string()),
  website: z.string().min(1, 'Required field').url(),
  specialties: z.array(z.string()),
  description: z.string().min(1, 'Required field'),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface SponsorDetailsFormProps {
  onSave: (value: PartialCreateSponsorInterface) => void;
  payload: PartialCreateSponsorInterface;
}

const SponsorDetailsForm = ({ onSave, payload }: SponsorDetailsFormProps) => {
  const classes = useSponsorDetailsFormStyles();

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: payload as ValidationSchema,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const onSubmit = handleSubmit(data => onSave(data));

  const regionsOptions = Object.values(Regions).map(item => {
    return { label: item, value: item };
  });

  const specialitiesOptions = Object.values(AssetClasses).map(item => {
    return { label: item, value: item };
  });

  return (
    <form onSubmit={onSubmit}>
      <Box sx={classes.formWrapper}>
        <Box sx={classes.profilePictureUploaderWrapper}>
          <Controller
            control={control}
            name="businessAvatar"
            render={({ field: { onChange } }) => (
              <ProfilePictureUploader
                onChange={onChange}
                variant={ProfilePictureUploaderVariant.SPONSOR}
                defaultImage={
                  payload.businessAvatar
                    ? URL.createObjectURL(payload?.businessAvatar)
                    : undefined
                }
              />
            )}
          />
        </Box>
        <Input
          placeholder="Vanity Name"
          topLabel="Vanity Name"
          register={register('vanityName')}
          value={watch('vanityName')}
          showClearOption={false}
        />
        <Input
          placeholder="Legal name"
          topLabel="Legal name"
          register={register('legalName')}
          value={watch('legalName')}
          showClearOption={false}
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
            register={register('stateOrCountry')}
            value={watch('stateOrCountry')}
            showClearOption={false}
          />
          <Input
            topLabel="State or Country Description"
            register={register('stateOrCountryDescription')}
            value={watch('stateOrCountryDescription')}
            showClearOption={false}
          />
        </Box>
        <Controller
          control={control}
          name="regions"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              options={regionsOptions}
              variant={SelectVariant.Dark}
              multiple
              onChange={onChange}
              value={value || []}
              topLabel="Region"
              placeholder="Region"
            />
          )}
        />
        <Input
          placeholder="https://example.com"
          topLabel="Website"
          register={register('website')}
          value={watch('website')}
          showClearOption={false}
        />
        <Controller
          control={control}
          name="specialties"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              options={specialitiesOptions}
              variant={SelectVariant.Dark}
              multiple
              onChange={onChange}
              value={value || []}
              topLabel="Speciality"
              placeholder="Speciality"
            />
          )}
        />
        <CustomTextArea
          placeholder="Tell us more about your deal"
          topLabel="Description"
          register={register('description')}
          value={watch('description')}
          height="140px"
        />
      </Box>
      <Box sx={classes.buttonWrapper}>
        <Button type="submit" disabled={!isValid}>
          Next
        </Button>
      </Box>
    </form>
  );
};

export default SponsorDetailsForm;
