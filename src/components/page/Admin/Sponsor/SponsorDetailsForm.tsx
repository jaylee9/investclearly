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
  file: isBrowser ? z.instanceof(File).optional() : z.any(),
  vanityName: z.string(),
  legalName: z.string(),
  street1: z.string(),
  street2: z.string(),
  city: z.string(),
  zipCode: z.string(),
  stateOrCountry: z.string(),
  stateOrCountryDescription: z.string(),
  regions: z.array(z.string()).optional(),
  website: z.string(),
  specialties: z.array(z.string()).optional(),
  description: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface SponsorDetailsFormProps {
  onSave: (value: PartialCreateSponsorInterface) => void;
}

const SponsorDetailsForm = ({ onSave }: SponsorDetailsFormProps) => {
  const classes = useSponsorDetailsFormStyles();

  const { handleSubmit, control, register } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
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
            name="file"
            render={({ field: { onChange } }) => (
              <ProfilePictureUploader
                onChange={onChange}
                variant={ProfilePictureUploaderVariant.SPONSOR}
              />
            )}
          />
        </Box>
        <Input
          placeholder="Vanity Name"
          topLabel="Vanity Name"
          register={register('vanityName')}
        />
        <Input
          placeholder="Legal name"
          topLabel="Legal name"
          register={register('legalName')}
        />
        <Input
          placeholder="123 First street"
          topLabel="Address line 1"
          register={register('street1')}
        />
        <Input topLabel="Address line 2" register={register('street2')} />
        <Box sx={classes.doubleInputsWrapper}>
          <Input
            placeholder="New York"
            topLabel="City"
            register={register('city')}
          />
          <Input
            placeholder="Type"
            topLabel="ZIP Code"
            register={register('zipCode')}
          />
        </Box>
        <Box sx={classes.doubleInputsWrapper}>
          <Input
            placeholder="USA"
            topLabel="State or Country"
            register={register('stateOrCountry')}
          />
          <Input
            topLabel="State or Country Description"
            register={register('stateOrCountryDescription')}
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
              topLabel="Region"
              placeholder="Region"
            />
          )}
        />
        <CustomTextArea
          placeholder="Tell us more about your deal"
          topLabel="Description"
          register={register('description')}
          height="140px"
        />
      </Box>
      <Box sx={classes.buttonWrapper}>
        <Button type="submit">Next</Button>
      </Box>
    </form>
  );
};

export default SponsorDetailsForm;
