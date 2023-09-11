import { Box } from '@mui/material';
import { useEditProfileStyles } from './styles';
import { useQuery } from 'react-query';
import { getUser } from '@/actions/user';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import Loading from '@/components/common/Loading';
import ProfilePictureUploader from '@/components/common/ProfilePictureUploader';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { Regions } from '@/backend/constants/enums/regions';
import Button from '@/components/common/Button';
import { updateProfileSettings } from '@/actions/user/profile-settings';

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
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem('user') as string).id);
  }, []);

  const { data } = useQuery<PublicUserInterface>(
    ['user'],
    () => {
      setIsLoading(true);
      return getUser({
        id: userId as string,
        reviewsLimit: 1,
        investmentsLimit: 1,
      }) as Promise<PublicUserInterface>;
    },
    {
      enabled: !!userId,
      staleTime: Infinity,
      onSuccess: data => {
        setValue('firstName', data?.firstName || '');
        setValue('lastName', data?.lastName || '');
        setValue('address', data?.address || '');
        setValue('regions', data.regions || []);
        setIsLoading(false);
      },
    }
  );

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async data => {
    const response = await updateProfileSettings({
      ...data,
      regions: data.regions as Regions[],
    });
    if (!('error' in response)) {
      localStorage.setItem('user', JSON.stringify(response));
    }
  });

  const regionsOptions = Object.values(Regions).map(item => {
    return { label: item, value: item };
  });

  return (
    <Box sx={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit} className="form">
          <Box sx={classes.uploaderWrapper}>
            <Controller
              control={control}
              name="profilePicture"
              render={({ field: { onChange } }) => (
                <ProfilePictureUploader
                  onChange={onChange}
                  defaultImage={data?.profilePicture}
                  username={`${data?.firstName} ${data?.lastName}`}
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
      )}
    </Box>
  );
};

export default EditProfile;
