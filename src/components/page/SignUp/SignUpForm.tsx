import { Box, Typography } from '@mui/material';
import { useSignUpFormStyles } from './styles';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const validationSchema = z
  .object({
    first_name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Email must be a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    repeat_password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine(data => data.password === data.repeat_password, {
    message: 'Passwords must match',
    path: ['repeat_password'],
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const SignUpForm = () => {
  const classes = useSignUpFormStyles();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: ValidationSchema) => {
    console.log(data);
  };

  return (
    <Box sx={classes.root}>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        Create an Account
      </Typography>
      <Button variant="auth" customStyles={{ height: '44px' }}>
        Sign up with Google
      </Button>
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
            register={register('first_name')}
            isClear={false}
            errorText={errors.first_name?.message}
          />
          <Input
            variant="outlined"
            placeholder="Last Name"
            register={register('last_name')}
            isClear={false}
          />
        </Box>
        <Input
          variant="outlined"
          placeholder="Email"
          register={register('email')}
          isClear={false}
        />
        <Input
          variant="outlined"
          placeholder="Password"
          type="password"
          register={register('password')}
          isClear={false}
        />
        <Input
          variant="outlined"
          placeholder="Repeat password"
          type="password"
          register={register('repeat_password')}
          isClear={false}
        />
        <Button type="submit">Create an account</Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
