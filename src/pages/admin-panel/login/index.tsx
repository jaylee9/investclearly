import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import LoginForm, {
  LoginFormValidationSchema,
} from '@/components/common/LoginFrom';

const Login = () => {
  const handleSubmit = async (data: LoginFormValidationSchema) => {
    const { email, password } = data;
    console.log(email, password);
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
