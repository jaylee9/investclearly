import Layout, { LayoutVariant } from '@/components/common/Layout';
import PasswordChangedSuccessfully from '@/components/common/PasswordChangedSuccessfully';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '@/actions/auth';
import ResetPasswordForm, {
  ResetPasswordFormValidationSchema,
} from '@/components/common/ResetPasswordForm';

const ResetPassword = () => {
  const router = useRouter();

  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);

  const handleSubmit = async (data: ResetPasswordFormValidationSchema) => {
    const { new_password } = data;
    const resetPasswordToken = router.query.token as string;
    const response = await resetPassword({
      newPassword: new_password,
      resetPasswordToken,
    });
    if (!('error' in response)) {
      setIsPasswordChangedSuccessfully(true);
    }
  };

  return (
    <Layout variant={LayoutVariant.Entry}>
      {isPasswordChangedSuccessfully ? (
        <PasswordChangedSuccessfully href="/login" />
      ) : (
        <ResetPasswordForm onSubmit={handleSubmit} />
      )}
    </Layout>
  );
};

export default ResetPassword;
