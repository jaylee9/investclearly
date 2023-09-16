import { Box, Typography } from '@mui/material';
import { useResetPasswordFormStyles } from './styles';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

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

export type ResetPasswordFormValidationSchema = z.infer<
  typeof validationSchema
>;

type ResetPasswordFormProps = {
  onSubmit: (data: ResetPasswordFormValidationSchema) => void;
};

const ResetPasswordForm = ({
  onSubmit,
}: ResetPasswordFormProps): JSX.Element => {
  const styles = useResetPasswordFormStyles();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPasswordFormValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        Change password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.formWrapper}>
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
  );
};

export default ResetPasswordForm;
