import { Box, ModalProps, Typography } from '@mui/material';
import PasswordModalsWrapper from './PasswordModalsWrapper';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionPasswordStyles } from './styles';
import Input from '@/components/common/Input';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { changePassword } from '@/actions/auth';
import { useState } from 'react';
import { useUser } from '@/contexts/User';

const validationSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    repeat_password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine(data => data.newPassword === data.repeat_password, {
    message: 'Passwords must match',
    path: ['repeat_password'],
  });

type ValidationSchema = z.infer<typeof validationSchema>;

interface Field {
  name: 'password' | 'newPassword' | 'repeat_password';
  label: string;
}

const fields: Field[] = [
  { name: 'password', label: 'Old Password' },
  { name: 'newPassword', label: 'New Password' },
  { name: 'repeat_password', label: 'Repeat Password' },
];

const ChangePasswordModal = ({
  onClose,
  ...props
}: Omit<ModalProps, 'children'>) => {
  const classes = useActionPasswordStyles();

  const [isChangedPassword, setIsChangedPassword] = useState(false);
  const { setUser } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async data => {
    const { newPassword, password } = data;
    const response = await changePassword({ newPassword, password });
    if (!('error' in response)) {
      localStorage.removeItem('user');
      setUser(null);
      setIsChangedPassword(true);
    }
  });

  const handleClose = (e: MouseEvent | object) => {
    setIsChangedPassword(false);
    reset();
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <PasswordModalsWrapper
      label="Change password"
      isLabel={!isChangedPassword}
      onClose={handleClose}
      {...props}
    >
      {isChangedPassword ? (
        <Box>
          <Typography variant="h3" sx={classes.changedTitle}>
            Password changed successfully!
          </Typography>
          <Typography variant="body1" sx={classes.changedSubTitle}>
            You can now log in with your new password
          </Typography>
          <Button onClick={handleClose} customStyles={{ width: '100%' }}>
            Back to settings
          </Button>
        </Box>
      ) : (
        <form onSubmit={onSubmit}>
          <Box sx={classes.inputsWrapper}>
            {fields.map(item => (
              <Input
                key={item.name}
                register={register(item.name)}
                topLabel={item.label}
                errorText={errors?.[item.name]?.message}
                error={!!errors?.[item.name]?.message}
                isPassword
                showClearOption={false}
              />
            ))}
            <Link href="/forgot-password" style={{ width: 'fit-content' }}>
              <Typography variant="body1" sx={classes.link}>
                Forgot password?
              </Typography>
            </Link>
          </Box>
          <Button type="submit" customStyles={{ width: '100%' }}>
            Save Password
          </Button>
        </form>
      )}
    </PasswordModalsWrapper>
  );
};

export default ChangePasswordModal;
