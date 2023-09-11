import { Box } from '@mui/material';
import { useEditProfileStyles } from './styles';
import ProfilePictureUploader from '@/components/common/ProfilePictureUploader';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { Regions } from '@/backend/constants/enums/regions';
import Button from '@/components/common/Button';
import { updateProfileSettings } from '@/actions/user/profile-settings';
import { useUser } from '@/contexts/User';
import Loading from '@/components/common/Loading';
import { useEffect } from 'react';

const isBrowser =
  typeof window !== 'undefined' && typeof window.File !== 'undefined';

const validationSchema = z.object({
  profilePicture: isBrowser ? z.instanceof(File).optional() : z.any(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  regions: z.string().optional().array(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const EditProfile = () => {
  const classes = useEditProfileStyles();
  const { user, setUser } = useUser();
  console.log(user);
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
    const response = await updateProfileSettings({
      ...data,
      regions: data.regions as Regions[],
    });
    if (!('error' in response)) {
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      reset();
    }
  });

  const regionsOptions = Object.values(Regions).map(item => {
    return { label: item, value: item };
  });

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('address', user.address);
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
          <Box sx={classes.nameInputsWrapper}>
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
              topLabel="Address"
              showClearOption={false}
              register={register('address')}
              value={watch('address')}
            />
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
        <Box sx={classes.buttonsWrapper}>
          <Button type="submit" disabled={!isDirty}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfile;
