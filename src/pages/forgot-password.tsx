import Layout, { LayoutVariant } from '@/components/common/Layout';
import ForgotPasswordForm from '@/components/common/ForgotPasswordForm';
import { forgotPassword } from '@/actions/auth';
import withPublicRoute from '@/HOC/withPublicRoute';

const ForgotPassword = () => {
  return (
    <Layout variant={LayoutVariant.Entry}>
      <ForgotPasswordForm
        backHref="/login"
        onSubmit={async data => {
          const { email } = data;
          await forgotPassword({ email });
        }}
      />
    </Layout>
  );
};

export default withPublicRoute(ForgotPassword);
