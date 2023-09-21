import { useRouter } from 'next/router';
import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import LoginForm, {
  LoginFormValidationSchema,
} from '@/components/common/LoginFrom';
import { adminLogin } from '@/actions/auth';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (data: LoginFormValidationSchema) => {
    const response = await adminLogin(data);
    if (!('error' in response)) {
      router.push('/admin-panel/deals');
    }
  };

  return (
    <LayoutAdminPanel>
      <LoginForm
        isUser={false}
        href="/admin-panel/forgot-password"
        onSubmit={handleSubmit}
      />
    </LayoutAdminPanel>
  );
};

export default Login;
