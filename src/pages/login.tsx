import Layout, { LayoutVariant } from '@/components/common/Layout';
import LoginForm from '@/components/page/Login/LoginForm';

const SignUp = () => {
  return (
    <Layout variant={LayoutVariant.Entry}>
      <LoginForm />
    </Layout>
  );
};

export default SignUp;
