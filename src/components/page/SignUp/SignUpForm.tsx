import { Box, Typography } from '@mui/material';
import { useSignUpFormStyles } from './styles';
import Button from '@/components/common/Button';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import Link from 'next/link';
import { googleLogin, signUp } from '@/actions/auth';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

const validationSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Email must be a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    repeat_password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    terms: z
      .boolean()
      .refine(value => value === true, 'You must agree to the terms'),
  })
  .refine(data => data.password === data.repeat_password, {
    message: 'Passwords must match',
    path: ['repeat_password'],
  });

type ValidationSchema = z.infer<typeof validationSchema>;

interface SignUpFormProps {
  setEmail: (value: string) => void;
}

const SignUpForm = ({ setEmail }: SignUpFormProps) => {
  const classes = useSignUpFormStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: ValidationSchema) => {
    const { email, password, firstName, lastName } = data;
    const { error } = await signUp({ email, password, firstName, lastName });
    if (!error) {
      setEmail(data.email);
    }
  };
  const handleGoogleSignUp = async (credenitals: CredentialResponse) => {
    await googleLogin({ token: credenitals.credential as string });
  };
  return (
    <Box sx={classes.root}>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        Create an Account
      </Typography>
      <Box sx={classes.googleLoginWrapper}>
        <GoogleLogin
          text="signup_with"
          width={500}
          onSuccess={handleGoogleSignUp}
        />
      </Box>
      <Box sx={classes.dividerWrapper}>
        <div className="divider" />
        <Typography variant="body1">or</Typography>
        <div className="divider" />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={classes.nameWrapper}>
          <Input
            variant="outlined"
            placeholder="First Name"
            register={register('firstName')}
            showClearOption={false}
            errorText={errors.firstName?.message}
          />
          <Input
            variant="outlined"
            placeholder="Last Name"
            register={register('lastName')}
            showClearOption={false}
            errorText={errors.lastName?.message}
          />
        </Box>
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
        <Input
          variant="outlined"
          placeholder="Repeat password"
          register={register('repeat_password')}
          showClearOption={false}
          errorText={errors.repeat_password?.message}
          isPassword
        />
        <Controller
          name="terms"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomCheckbox
              label={
                <Typography variant="body1">
                  I agree to Invest Clearly{' '}
                  <Link href="/terms-conditions">Terms of Service</Link>
                </Typography>
              }
              customStyles={{ marginBottom: '32px' }}
              checked={field.value}
              onChange={e => field.onChange(e.target.checked)}
              error={!!errors.terms?.message}
            />
          )}
        />

        <Button type="submit" customStyles={{ marginBottom: '16px' }}>
          Create an account
        </Button>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Already have an account? <Link href="/login">Log in</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignUpForm;
