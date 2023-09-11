import { useRouter } from 'next/router';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import LoginForm, {
  LoginFormValidationSchema,
} from '@/components/common/LoginFrom';
import withPublicRoute from '@/HOC/withPublicRoute';
import { googleLogin, login } from '@/actions/auth';
import { CredentialResponse } from '@react-oauth/google';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (data: LoginFormValidationSchema) => {
    const { email, password } = data;
    const response = await login({ email, password });
    if (!('error' in response)) {
      router.push('/');
    }
  };

  const handleGoogleLoginSubmit = async (credentials: CredentialResponse) => {
    const response = await googleLogin({
      token: credentials.credential as string,
    });
    if (!('error' in response)) {
      router.push('/');
    }
  };

  return (
    <Layout variant={LayoutVariant.Entry}>
      <LoginForm
        isUser={true}
        href="/forgot-password"
        onSubmit={handleSubmit}
        handleGoogleLogin={handleGoogleLoginSubmit}
      />
    </Layout>
  );
};

export default withPublicRoute(Login);
