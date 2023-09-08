import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import ForgotPasswordForm from '@/components/common/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <LayoutAdminPanel>
      <ForgotPasswordForm
        href="/admin-panel/login"
        onSubmit={async data => {
          const { email } = data;
          /* TODO: add request */
          console.log(`
          - email: ${email}
          `);
        }}
      />
    </LayoutAdminPanel>
  );
};

export default ForgotPassword;
