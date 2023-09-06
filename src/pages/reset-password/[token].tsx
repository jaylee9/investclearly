import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, Typography } from '@mui/material';
import useResetPasswordStyles from '../../pages_styles/resetPasswordStyles';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '@/actions/auth';

const validationSchema = z
  .object({
    new_password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    repeat_password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine(data => data.new_password === data.repeat_password, {
    message: 'Passwords must match',
    path: ['repeat_password'],
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const ResetPassword = () => {
  const router = useRouter();
  const [isChanged, setIsChanged] = useState(false);
  const classes = useResetPasswordStyles();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: ValidationSchema) => {
    const { new_password } = data;
    const resetPasswordToken = router.query.token as string;
    const response = await resetPassword({
      newPassword: new_password,
      resetPasswordToken,
    });
    if (!('error' in response)) {
      setIsChanged(true);
    }
  };
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box sx={classes.root}>
        {isChanged ? (
          <>
            <Typography
              variant="h2"
              fontWeight={600}
              marginBottom="8px"
              maxWidth="420px"
            >
              Password changed successfully!
            </Typography>
            <Typography variant="body1" sx={classes.infoText}>
              You can now log in with your new password
            </Typography>
            <Link href="/login">
              <Button customStyles={{ width: '100%' }}>Log in</Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant="h2" fontWeight={600} marginBottom="40px">
              Change password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={classes.formWrapper}>
                <Input
                  variant="outlined"
                  topLabel="New password"
                  register={register('new_password')}
                  showClearOption={false}
                  isPassword
                  customStyles={{ marginBottom: '20px' }}
                />
                <Input
                  variant="outlined"
                  topLabel="Repeat password"
                  register={register('repeat_password')}
                  showClearOption={false}
                  isPassword
                  customStyles={{ marginBottom: '32px' }}
                />
                <Button type="submit" disabled={!isValid}>
                  Save password
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default ResetPassword;
