import { Box } from '@mui/material';
import useSignUpStyles from './signUpStyles';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import SignUpForm from '@/components/page/SignUp/SignUpForm';

const SignUp = () => {
  const classes = useSignUpStyles();
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box sx={classes.root}>
        <SignUpForm />
      </Box>
    </Layout>
  );
};

export default SignUp;
