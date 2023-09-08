import { Box } from '@mui/material';
import useResetPasswordStyles from '../../../pages_styles/resetPasswordStyles';
import PasswordChangedSuccessfully from '@/components/common/PasswordChangedSuccessfully';
import { useState } from 'react';
import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import ResetPasswordForm from '@/components/common/ResetPasswordForm';

const ResetPassword = () => {
  const styles = useResetPasswordStyles();

  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);

  return (
    <LayoutAdminPanel>
      <Box sx={styles.root}>
        {isPasswordChangedSuccessfully ? (
          <PasswordChangedSuccessfully href="/admin-panel/login" />
        ) : (
          <ResetPasswordForm
            onSubmit={async data => {
              const { new_password } = data;
              /* TODO: add request */
              console.log(`
            - new_password: ${new_password}
            `);
              setIsPasswordChangedSuccessfully(true);
            }}
          />
        )}
      </Box>
    </LayoutAdminPanel>
  );
};

export default ResetPassword;
