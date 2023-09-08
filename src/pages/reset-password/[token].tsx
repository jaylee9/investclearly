import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box } from '@mui/material';
import useResetPasswordStyles from '../../pages_styles/resetPasswordStyles';
import PasswordChangedSuccessfully from '@/components/common/PasswordChangedSuccessfully';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '@/actions/auth';
import ResetPasswordForm from '@/components/common/ResetPasswordForm';

const ResetPassword = () => {
  const styles = useResetPasswordStyles();
  const router = useRouter();

  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);

  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box sx={styles.root}>
        {isPasswordChangedSuccessfully ? (
          <PasswordChangedSuccessfully href="/login" />
        ) : (
          <ResetPasswordForm
            onSubmit={async data => {
              const { new_password } = data;
              const resetPasswordToken = router.query.token as string;
              const response = await resetPassword({
                newPassword: new_password,
                resetPasswordToken,
              });
              if (!('error' in response)) {
                setIsPasswordChangedSuccessfully(true);
              }
            }}
          />
        )}
      </Box>
    </Layout>
  );
};

export default ResetPassword;
