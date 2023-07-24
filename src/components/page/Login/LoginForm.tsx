import { Box, Typography } from '@mui/material';
import { useLoginFormStyles } from './styles';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { googleLogin, login } from '@/actions/auth';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';

const validationSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string()

    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const LoginForm = () => {
  const classes = useLoginFormStyles();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: ValidationSchema) => {
    const { email, password } = data;
    const { isError } = await login({ email, password });
    if (!isError) {
      router.push('/');
    }
  };
  const handleGoogleLogin = async (token: string) => {
    await googleLogin({ token });
  };
  return (
    <Box sx={classes.root}>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        Log in
      </Typography>
      <Box sx={classes.googleLoginWrapper}>
        <GoogleLogin
          text="signup_with"
          width="1000"
          onSuccess={response =>
            handleGoogleLogin(response.credential as string)
          }
        />
      </Box>
      <Box sx={classes.dividerWrapper}>
        <div className="divider" />
        <Typography variant="body1">or</Typography>
        <div className="divider" />
      </Box>
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
        <Link href="/forgot-password">
          <Typography variant="body1" sx={classes.forgotPasswordLink}>
            Forgot password?
          </Typography>
        </Link>
        <Button type="submit" customStyles={{ marginBottom: '16px' }}>
          Log in
        </Button>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          New to Invest Clearly? <Link href="/sign-up">Create an Account</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;
