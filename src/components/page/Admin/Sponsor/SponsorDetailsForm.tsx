import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import { LocationInterface } from '@/backend/services/locations/interfaces/location.interface';
import { PartialCreateSponsorInterface } from '@/actions/sponsors';
import Button from '@/components/common/Button';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import CustomTextArea from '@/components/common/TextArea';
import Input from '@/components/common/Input';
import ProfilePictureUploader, {
  ProfilePictureUploaderVariant,
} from '@/components/common/ProfilePictureUploader';
import { useSponsorDetailsFormStyles } from './styles';

const isBrowser =
  typeof window !== 'undefined' && typeof window.File !== 'undefined';

interface ModifiedCreateSponsorInterface extends PartialCreateSponsorInterface {
  locations?: LocationInterface[];
}

interface SponsorDetailsFormProps {
  onSave: (value: PartialCreateSponsorInterface) => void;
  payload: ModifiedCreateSponsorInterface;
  isEdit: boolean;
  onClose: (e: MouseEvent | object) => void;
  isLoading: boolean;
}

const SponsorDetailsForm = ({
  onSave,
  payload,
  isEdit,
  onClose,
  isLoading,
}: SponsorDetailsFormProps) => {
  const validationSchema = z.object({
    businessAvatar: isBrowser
      ? z.union([z.instanceof(File), z.string()])
      : z.any(),
    vanityName: z.string().optional(),
    legalName: isEdit ? z.string() : z.string().min(1, 'Required field'),
    street1: isEdit ? z.string() : z.string().min(1, 'Required field'),
    street2: isEdit ? z.string() : z.string(),
    city: isEdit ? z.string() : z.string().min(1, 'Required field'),
    zipCode: isEdit ? z.string() : z.string().min(1, 'Required field'),
    stateOrCountryDescription: isEdit
      ? z.string()
      : z.string().min(1, 'Required field'),
    website: isEdit
      ? z.string().url()
      : z.string().min(1, 'Required field').url(),
    specialties: isEdit
      ? z.array(z.string())
      : z.array(z.string()).min(1, 'Required field'),
    description: isEdit ? z.string() : z.string().min(1, 'Required field'),
    yearOfFoundation: z.union([z.string(), z.number()]),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const classes = useSponsorDetailsFormStyles();

  let businessAvatarUrl;
  if (payload.businessAvatar) {
    businessAvatarUrl =
      typeof payload.businessAvatar === 'string'
        ? payload.businessAvatar
        : URL.createObjectURL(payload?.businessAvatar);
  }

  const [defaultImage, setDefaultImage] = useState(businessAvatarUrl);

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...payload,
      yearOfFoundation: Number(payload?.yearOfFoundation),
    } as ValidationSchema,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const onSubmit = handleSubmit(data => {
    if (isEdit) {
      const formattedPayload = {
        exemptions: payload.exemptions,
        regulations: payload.regulations,
        interests: payload.interests,
        investmentStructures: payload.investmentStructures,
        yearOfFoundation: Number(data.yearOfFoundation),
      };
      onSave({ ...data, ...formattedPayload });
    } else {
      onSave({ ...data, yearOfFoundation: Number(data.yearOfFoundation) });
    }
  });

  const specialitiesOptions = Object.values(AssetClasses).map(item => ({
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
    if (payload.locations && payload.locations.length > 0) {
      const location = payload.locations[0];

      locationFields.forEach(field => {
        setValue(field as keyof ValidationSchema, location[field] || '');
      });
    }
    if (payload) {
      for (const key in payload) {
        if (
          Object.prototype.hasOwnProperty.call(payload, key) &&
          !locationFields.includes(key as keyof LocationInterface)
        ) {
          setValue(
            key as keyof ValidationSchema,
            (payload[
              key as keyof ModifiedCreateSponsorInterface
            ] as unknown as ValidationSchema[keyof ValidationSchema]) || ''
          );
        }
      }
      if (isEdit) {
        setDefaultImage(payload.businessAvatar as string);
      }
    }
  }, [payload, setValue, isEdit]);

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
                defaultImage={defaultImage}
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
        <Box sx={classes.doubleInputsWrapper}>
          <Input
            placeholder="yyyy"
            topLabel="Year Foundation"
            register={register('yearOfFoundation')}
            value={watch('yearOfFoundation')}
            showClearOption={false}
            type="number"
          />
        </Box>
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
          placeholder="Tell us more about your company"
          topLabel="Description"
          register={register('description')}
          value={watch('description')}
          height="140px"
        />
      </Box>
      <Box sx={classes.buttonWrapper}>
        {isEdit ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isDirty || isLoading}>
              Save
            </Button>
          </>
        ) : (
          <Button type="submit" disabled={!isValid}>
            Next
          </Button>
        )}
      </Box>
    </form>
  );
};

export default SponsorDetailsForm;
