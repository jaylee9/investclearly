import PasswordChangedSuccessfully from '@/components/common/PasswordChangedSuccessfully';
import { useState } from 'react';
import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import ResetPasswordForm, {
  ResetPasswordFormValidationSchema,
} from '@/components/common/ResetPasswordForm';
import { resetPassword } from '@/actions/auth';
import { useRouter } from 'next/router';

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
    <LayoutAdminPanel>
      {isPasswordChangedSuccessfully ? (
        <PasswordChangedSuccessfully href="/admin-panel/login" />
      ) : (
        <ResetPasswordForm onSubmit={handleSubmit} />
      )}
    </LayoutAdminPanel>
  );
};

export default ResetPassword;
