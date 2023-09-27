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
import { useState } from 'react';
import DeactivateAccountModal from './Modals/DeactivateAccount';
import ChangePasswordModal from './Modals/ChangePassword';
import AddPasswordModal from './Modals/AddPassword';
import { useRouter } from 'next/router';

const validationSchema = z.object({
  newEmail: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

enum ModalTypes {
  ADD_PASSWORD = 'addPassword',
  CHANGE_PASSWORD = 'changePassword',
  DEACTIVATE_ACCOUNT = 'deactivateAccount',
}

const CredentialsSettings = () => {
  const classes = useCredentialsSettingsStyles();

  const router = useRouter();

  const { user, setUser } = useUser();

  const [openModals, setOpenModals] = useState({
    addPassword: false,
    changePassword: false,
    deactivateAccount: false,
  });

  const handleOpenModal = (key: ModalTypes) => {
    setOpenModals(prevState => {
      return { ...prevState, [key]: true };
    });
  };

  const handleCloseModal = (key: ModalTypes) => {
    if (!user) {
      router.push('/login');
    }
    setOpenModals(prevState => {
      return { ...prevState, [key]: false };
    });
  };

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

  const isGoogleAccount = !!user?.googleId && !user.isPasswordAdded;

  return (
    <Box sx={classes.root}>
      <Typography variant="h5" sx={classes.title}>
        Email
      </Typography>
      {isGoogleAccount && (
        <Typography variant="caption" sx={classes.googleWarning}>
          <i className="icon-Warning" />
          You can&apos;t change the email since you&apos;ve been authenticated
          with the Google account
        </Typography>
      )}
      <form onSubmit={onSubmit}>
        <Input
          topLabel="Email"
          disabled={isGoogleAccount}
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
          disabled={isGoogleAccount}
          register={register('password')}
          value={watch('password')}
          isPassword
          showClearOption={false}
          placeholder="Password"
          customStyles={classes.input}
          errorText={errors.password?.message}
          error={!!errors.password?.message}
        />
        {!isGoogleAccount && (
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
        <Typography variant="h5" sx={classes.title}>
          Password
        </Typography>
        <Button
          variant="tertiary"
          customStyles={{ padding: 0, marginBottom: '32px', display: 'block' }}
          onClick={() =>
            handleOpenModal(
              isGoogleAccount
                ? ModalTypes.ADD_PASSWORD
                : ModalTypes.CHANGE_PASSWORD
            )
          }
        >
          {isGoogleAccount ? 'Add' : 'Change'} password
        </Button>
        <Button
          color="error"
          variant="secondary"
          sxCustomStyles={classes.deactivateButton}
          onClick={() => handleOpenModal(ModalTypes.DEACTIVATE_ACCOUNT)}
        >
          Deactivate my account
        </Button>
      </form>
      <ChangePasswordModal
        open={openModals[ModalTypes.CHANGE_PASSWORD]}
        onClose={() => handleCloseModal(ModalTypes.CHANGE_PASSWORD)}
      />
      <AddPasswordModal
        open={openModals[ModalTypes.ADD_PASSWORD]}
        onClose={() => handleCloseModal(ModalTypes.ADD_PASSWORD)}
      />
      <DeactivateAccountModal
        open={openModals[ModalTypes.DEACTIVATE_ACCOUNT]}
        onClose={() => handleCloseModal(ModalTypes.DEACTIVATE_ACCOUNT)}
      />
    </Box>
  );
};

export default CredentialsSettings;
