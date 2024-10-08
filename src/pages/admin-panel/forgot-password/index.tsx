import { forgotPassword } from '@/actions/auth';
import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import ForgotPasswordForm, {
  ForgotPasswordValidationSchema,
} from '@/components/common/ForgotPasswordForm';

const ForgotPassword = () => {
  const handleSubmit = async (data: ForgotPasswordValidationSchema) => {
    const { email } = data;
    await forgotPassword({ email });
  };
  return (
    <LayoutAdminPanel>
      <ForgotPasswordForm
        backHref="/admin-panel/login"
        onSubmit={handleSubmit}
      />
    </LayoutAdminPanel>
  );
};

export default ForgotPassword;
