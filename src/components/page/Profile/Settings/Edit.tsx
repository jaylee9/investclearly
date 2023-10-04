import { Box } from '@mui/material';
import { buttonsWrapper, useEditProfileStyles } from './styles';
import ProfilePictureUploader from '@/components/common/ProfilePictureUploader';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { Regions } from '@/backend/constants/enums/regions';
import Button from '@/components/common/Button';
import {
  UpdateProfileSettingPayload,
  updateProfileSettings,
} from '@/actions/user/profile-settings';
import { useUser } from '@/contexts/User';
import Loading from '@/components/common/Loading';
import { useEffect, useState } from 'react';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import sanitizeUserUpdatePayload from '@/helpers/sanitizeUserUpdatePayload';
import { LocationInterface } from '@/backend/services/locations/interfaces/location.interface';
import { USER_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';

const isBrowser =
  typeof window !== 'undefined' && typeof window.File !== 'undefined';

const validationSchema = z.object({
  profilePicture: isBrowser ? z.instanceof(File).optional() : z.any(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  street1: z.string().optional(),
  street2: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  stateOrCountry: z.string().optional(),
  stateOrCountryDescription: z.string().optional(),
  regions: z.string().optional().array(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const EditProfile = () => {
  const classes = useEditProfileStyles();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);

    const formattedUser = sanitizeUserUpdatePayload(
      user as PublicUserInterface
    );
    const response = await updateProfileSettings({
      ...formattedUser,
      ...data,
    } as UpdateProfileSettingPayload);
    if (!('error' in response)) {
      setUser(response);
      localStorage.setItem(
        USER_OBJECT_LOCALSTORAGE_KEY,
        JSON.stringify(response)
      );
      reset();
    }
    setIsLoading(false);
  });

  const regionsOptions = Object.values(Regions).map(item => {
    return { label: item, value: item };
  });

  useEffect(() => {
    if (user) {
      if (!!user.locations.length) {
        const locationFields: (keyof LocationInterface)[] = [
          'street1',
          'street2',
          'city',
          'zipCode',
          'stateOrCountry',
          'stateOrCountryDescription',
        ];
        const location = user.locations[0];
        locationFields.forEach(field => {
          setValue(field as keyof ValidationSchema, location[field]);
        });
      }
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('regions', user.regions);
    }
  }, [user, setValue]);

  if (!user) {
    return <Loading />;
  }
  return (
    <Box sx={classes.root}>
      <form onSubmit={onSubmit} className="form">
        <Box sx={classes.uploaderWrapper}>
          <Controller
            control={control}
            name="profilePicture"
            render={({ field: { onChange } }) => (
              <ProfilePictureUploader
                onChange={onChange}
                defaultImage={user?.profilePicture}
                username={`${user?.firstName} ${user?.lastName}`}
              />
            )}
          />
        </Box>
        <Box sx={classes.content}>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              topLabel="First Name"
              showClearOption={false}
              register={register('firstName')}
              value={watch('firstName')}
            />
            <Input
              topLabel="Last Name"
              showClearOption={false}
              register={register('lastName')}
              value={watch('lastName')}
            />
          </Box>
          <Box sx={classes.singleInputsWrapper}>
            <Input
              topLabel="Address line 1"
              showClearOption={false}
              register={register('street1')}
              value={watch('street1')}
            />
            <Input
              topLabel="Address line 2"
              showClearOption={false}
              register={register('street2')}
              value={watch('street2')}
            />
          </Box>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              topLabel="City"
              showClearOption={false}
              register={register('city')}
              value={watch('city')}
            />
            <Input
              topLabel="ZIP Code"
              showClearOption={false}
              register={register('zipCode')}
              value={watch('zipCode')}
            />
          </Box>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              topLabel="State or Country"
              showClearOption={false}
              register={register('stateOrCountry')}
              value={watch('stateOrCountry')}
            />
            <Input
              topLabel="State or Country Description"
              showClearOption={false}
              register={register('stateOrCountryDescription')}
              value={watch('stateOrCountryDescription')}
            />
          </Box>
          <Box sx={classes.singleInputsWrapper}>
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
                  topLabel="State"
                />
              )}
            />
          </Box>
        </Box>
        <Box sx={buttonsWrapper}>
          <Button type="submit" disabled={!isDirty || isLoading}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfile;
