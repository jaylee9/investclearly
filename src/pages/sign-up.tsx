import { Box } from '@mui/material';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import SignUpForm from '@/components/page/SignUp/SignUpForm';
import { useState } from 'react';
import ConfirmEmail from '@/components/page/SignUp/ConfirmEmail';

const SignUp = () => {
  const [email, setEmail] = useState('123');
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box>
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
