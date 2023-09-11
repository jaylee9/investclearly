import { Box, Typography } from '@mui/material';
import { useLoginFormStyles } from './styles';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link, { LinkProps } from 'next/link';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const validationSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string()

    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type LoginFormValidationSchema = z.infer<typeof validationSchema>;

type LoginUserForm = {
  isUser: true;
  onSubmit: (data: LoginFormValidationSchema) => void;
  handleGoogleLogin: (credenitals: CredentialResponse) => void;
};

type LoginAdminForm = {
  isUser: false;
  onSubmit: (data: LoginFormValidationSchema) => void;
  handleGoogleLogin?: never;
};

type LoginFormProps = {
  href: LinkProps['href'];
} & (LoginUserForm | LoginAdminForm);

const LoginForm = ({
  isUser,
  href,
  onSubmit,
  handleGoogleLogin,
}: LoginFormProps): JSX.Element => {
  const styles = useLoginFormStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <Box sx={styles.root}>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        Log in
      </Typography>
      {isUser && (
        <>
          <Box sx={styles.googleLoginWrapper}>
            <GoogleLogin
              width={500}
              text="signup_with"
              onSuccess={handleGoogleLogin}
            />
          </Box>
          <Box sx={styles.dividerWrapper}>
            <div className="divider" />
            <Typography variant="body1">or</Typography>
            <div className="divider" />
          </Box>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant="outlined"
          placeholder="Email"
          register={register('email')}
          showClearOption={false}
          errorText={errors.email?.message}
        />
        <Input
          variant="outlined"
          placeholder="Password"
          register={register('password')}
          showClearOption={false}
          errorText={errors.password?.message}
          isPassword
        />
        <Link href={href}>
          <Typography variant="body1" sx={styles.forgotPasswordLink}>
            Forgot password?
          </Typography>
        </Link>
        <Button type="submit" customStyles={{ marginBottom: '16px' }}>
          Log in
        </Button>
        {isUser && (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            New to Invest Clearly?{' '}
            <Link href="/sign-up">Create an Account</Link>
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default LoginForm;
