import { Box } from '@mui/material';
import useResetPasswordStyles from '../../../pages_styles/resetPasswordStyles';
import PasswordChangedSuccessfully from '@/components/common/PasswordChangedSuccessfully';
import { useState } from 'react';
import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import ResetPasswordForm, {
  ResetPasswordFormValidationSchema,
} from '@/components/common/ResetPasswordForm';

const ResetPassword = () => {
  const styles = useResetPasswordStyles();

  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);

  const handleSubmit = async (data: ResetPasswordFormValidationSchema) => {
    const { new_password } = data;
    console.log(new_password);
    setIsPasswordChangedSuccessfully(true);
  };

  return (
    <LayoutAdminPanel>
      <Box sx={styles.root}>
        {isPasswordChangedSuccessfully ? (
          <PasswordChangedSuccessfully href="/admin-panel/login" />
        ) : (
          <ResetPasswordForm onSubmit={handleSubmit} />
        )}
      </Box>
    </LayoutAdminPanel>
  );
};

export default ResetPassword;
