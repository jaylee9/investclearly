import { Box, ModalProps, Typography } from '@mui/material';
import PasswordModalsWrapper from './PasswordModalsWrapper';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionPasswordStyles } from './styles';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { addPassword } from '@/actions/auth';
import { useState } from 'react';
import { useUser } from '@/contexts/User';

const validationSchema = z
  .object({
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
  name: 'newPassword' | 'repeat_password';
  label: string;
}

const fields: Field[] = [
  { name: 'newPassword', label: 'New Password' },
  { name: 'repeat_password', label: 'Repeat Password' },
];

const AddPasswordModal = ({
  onClose,
  ...props
}: Omit<ModalProps, 'children'>) => {
  const classes = useActionPasswordStyles();

  const [isAddedPassword, setIsAddedPassword] = useState(false);

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
    const { newPassword } = data;
    const response = await addPassword({ newPassword });
    if (!('error' in response)) {
      localStorage.removeItem('user');
      setUser(null);
      setIsAddedPassword(true);
    }
  });

  const handleClose = (e: MouseEvent | object) => {
    setIsAddedPassword(false);
    reset();
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <PasswordModalsWrapper
      label="Add password"
      isLabel={!isAddedPassword}
      onClose={handleClose}
      {...props}
    >
      {isAddedPassword ? (
        <Box sx={classes.successWrapper}>
          <Typography variant="h3" sx={classes.changedTitle}>
            Password added successfully!
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
          </Box>
          <Button type="submit" customStyles={{ width: '100%' }}>
            Save Password
          </Button>
        </form>
      )}
    </PasswordModalsWrapper>
  );
};

export default AddPasswordModal;
