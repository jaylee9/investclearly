import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, Typography } from '@mui/material';
import useForgotPasswordStyles from '../../pages_styles/forgotPasswordStyles';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';

const validationSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const ForgotPassword = () => {
  const classes = useForgotPasswordStyles();
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
          Forgot password
        </Typography>
        <Typography variant="body1" sx={classes.infoText}>
          Enter an email associated with your account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={classes.formWrapper}>
            <Input
              variant="outlined"
              placeholder="Email"
              register={register('email')}
              showClearOption={false}
            />
            <Button type="submit" disabled={!isValid}>
              Send reset link
            </Button>
          </Box>
        </form>
        <Typography variant="body1" sx={classes.rememberPassword}>
          Remembered password? <Link href="/login">Back to Log in</Link>
        </Typography>
      </Box>
    </Layout>
  );
};

export default ForgotPassword;
