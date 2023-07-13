import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, Typography } from '@mui/material';
import useResetPasswordStyles from './styles';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';

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
  const classes = useResetPasswordStyles();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: ValidationSchema) => {
    console.log(data);
  };
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box sx={classes.root}>
        <Typography variant="h2" fontWeight={600} marginBottom="8px">
          Change password
        </Typography>
        <Typography variant="body1" sx={classes.infoText}>
          Enter an email associated with your account
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
      </Box>
    </Layout>
  );
};

export default ResetPassword;
