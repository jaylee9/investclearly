import { Box, Typography } from '@mui/material';
import { useForgotPasswordFormStyles } from './styles';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link, { LinkProps } from 'next/link';

const validationSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
});

export type ForgotPasswordValidationSchema = z.infer<typeof validationSchema>;

type ForgotPasswordFormProps = {
  backHref: LinkProps['href'];
  onSubmit: (data: ForgotPasswordValidationSchema) => void;
};

const ForgotPasswordForm = ({
  backHref,
  onSubmit,
}: ForgotPasswordFormProps): JSX.Element => {
  const styles = useForgotPasswordFormStyles();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <Box sx={styles.root}>
      <Typography variant="h2" fontWeight={600} marginBottom="8px">
        Forgot password
      </Typography>
      <Typography variant="body1" sx={styles.infoText}>
        Enter an email associated with your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.formWrapper}>
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
      <Typography variant="body1" sx={styles.rememberPassword}>
        Remembered password? <Link href={backHref}>Back to Log in</Link>
      </Typography>
    </Box>
  );
};

export default ForgotPasswordForm;
