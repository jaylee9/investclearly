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

const isBrowser =
  typeof window !== 'undefined' && typeof window.File !== 'undefined';

const validationSchema = z.object({
  profilePicture: isBrowser ? z.instanceof(File) : z.any(),
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
    { enabled: !!userId, onSuccess: () => setIsLoading(false) }
  );

  const { control, handleSubmit } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <Box sx={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit}>
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
        </form>
      )}
    </Box>
  );
};

export default EditProfile;
