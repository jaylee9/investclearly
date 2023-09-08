import { useRouter } from 'next/router';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import LoginForm from '@/components/common/LoginFrom';
import withPublicRoute from '@/HOC/withPublicRoute';
import { googleLogin, login } from '@/actions/auth';

const Login = () => {
  const router = useRouter();

  return (
    <Layout variant={LayoutVariant.Entry}>
      <LoginForm
        isUser={true}
        href="/forgot-password"
        onSubmit={async data => {
          const { email, password } = data;
          const response = await login({ email, password });
          if (!('error' in response)) {
            router.push('/');
          }
        }}
        handleGoogleLogin={async credenitals => {
          const response = await googleLogin({
            token: credenitals.credential as string,
          });
          if (!('error' in response)) {
            router.push('/');
          }
        }}
      />
    </Layout>
  );
};

export default withPublicRoute(Login);
