import { Box } from '@mui/material';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import LoginForm from '@/components/page/Login/LoginForm';

const SignUp = () => {
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box sx={classes.root}>
        <LoginForm />
      </Box>
    </Layout>
  );
};

export default SignUp;
