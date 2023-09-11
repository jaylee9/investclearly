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

const isBrowser =
  typeof window !== 'undefined' && typeof window.File !== 'undefined';

const validationSchema = z.object({
  profilePicture: isBrowser ? z.instanceof(File) : z.any(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
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
      onSuccess: data => {
        setValue('firstName', data?.firstName || '');
        setValue('lastName', data?.lastName || '');
        setValue('address', data?.address || '');
        setIsLoading(false);
      },
    }
  );

  const { control, handleSubmit, register, setValue, watch } =
    useForm<ValidationSchema>({
      resolver: zodResolver(validationSchema),
    });

  const onSubmit = handleSubmit(data => console.log(data));

  const regionsOptions = Object.values(Regions).map(item => {
    return { label: item, value: item };
  });

  return (
    <Box sx={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit}>
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
              <CustomSelect
                options={regionsOptions}
                variant={SelectVariant.Dark}
              />
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default EditProfile;
