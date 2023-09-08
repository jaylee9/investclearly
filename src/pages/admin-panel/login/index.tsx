import LayoutAdminPanel from '../../../components/common/LayoutAdminPanel';
import LoginForm from '@/components/common/LoginFrom';

const Login = () => {
  return (
    <LayoutAdminPanel>
      <LoginForm
        isUser={false}
        href="/admin-panel/forgot-password"
        onSubmit={async data => {
          const { email, password } = data;
          /* TODO: add request */
          console.log(`
          - email: ${email}
          - password: ${password}
          `);
        }}
      />
    </LayoutAdminPanel>
  );
};

export default Login;
