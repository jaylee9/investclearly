import withPublicRoute from '@/HOC/withPublicRoute';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import LoginForm from '@/components/page/Login/LoginForm';

const SignIn = () => {
  return (
    <Layout variant={LayoutVariant.Entry}>
      <LoginForm />
    </Layout>
  );
};

export default withPublicRoute(SignIn);
