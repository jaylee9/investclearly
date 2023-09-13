import { Box, Typography } from '@mui/material';
import { useCredentialsSettingsStyles } from './styles';
import { useUser } from '@/contexts/User';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/common/Button';
import { updateEmail } from '@/actions/user';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';

const validationSchema = z.object({
  newEmail: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

const CredentialsSettings = () => {
  const classes = useCredentialsSettingsStyles();

  const { user, setUser } = useUser();

  const defaultValues = {
    newEmail: user?.email || '',
    password: '',
  };

  const {
    handleSubmit,
    watch,
    register,
    formState: { isDirty, errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const allFieldsDirty = () => {
    const currentValues = watch();
    return (
      Object.keys(defaultValues) as Array<keyof typeof defaultValues>
    ).every(key => defaultValues[key] !== currentValues[key]);
  };

  const onSubmit = handleSubmit(async data => {
    const response = await updateEmail(data);
    if (!('error' in response)) {
      const formattedUser = {
        ...user,
        email: data.newEmail,
      } as PublicUserInterface;
      localStorage.setItem('user', JSON.stringify(formattedUser));
      setUser(formattedUser);
      reset({ newEmail: data.newEmail, password: '' });
    }
  });

  const handleReset = () => {
    reset({
      newEmail: user?.email,
      password: '',
    });
  };

  return (
    <Box sx={classes.root}>
      <Typography variant="h5" sx={classes.title}>
        Email
      </Typography>
      {!!user?.googleId && (
        <Typography variant="caption" sx={classes.googleWarning}>
          <i className="icon-Warning" />
          You can&apos;t change the email since you&apos;ve been authenticated
          with the Google account
        </Typography>
      )}
      <form onSubmit={onSubmit}>
        <Input
          topLabel="Email"
          disabled={!!user?.googleId}
          register={register('newEmail')}
          value={watch('newEmail')}
          showClearOption={false}
          placeholder="Email"
          customStyles={classes.input}
          errorText={errors.newEmail?.message}
          error={!!errors.newEmail?.message}
        />
        <Input
          topLabel="Password"
          disabled={!!user?.googleId}
          register={register('password')}
          value={watch('password')}
          isPassword
          showClearOption={false}
          placeholder="Password"
          customStyles={classes.input}
          errorText={errors.password?.message}
          error={!!errors.password?.message}
        />
        {!user?.googleId && (
          <Box sx={classes.buttonsWrapper}>
            <Button
              variant="tertiary"
              disabled={!isDirty}
              customStyles={{ padding: 0 }}
              onClick={handleReset}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!allFieldsDirty()}>
              Save email
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default CredentialsSettings;
