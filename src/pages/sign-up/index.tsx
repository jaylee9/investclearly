import { Box } from '@mui/material';
import useSignUpStyles from './signUpStyles';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import SignUpForm from '@/components/page/SignUp/SignUpForm';
import { useState } from 'react';
import ConfirmEmail from '@/components/page/SignUp/ConfirmEmail';

const SignUp = () => {
  const classes = useSignUpStyles();
  const [email, setEmail] = useState('test@gmail.com');
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box sx={classes.root}>
        {email ? (
          <ConfirmEmail email={email} />
        ) : (
          <SignUpForm setEmail={setEmail} />
        )}
      </Box>
    </Layout>
  );
};

export default SignUp;
