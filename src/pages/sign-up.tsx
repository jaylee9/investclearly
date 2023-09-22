import Layout, { LayoutVariant } from '@/components/common/Layout';
import SignUpForm from '@/components/page/SignUp/SignUpForm';
import { useState } from 'react';
import ConfirmEmail from '@/components/page/SignUp/ConfirmEmail';
import withPublicRoute from '@/HOC/withPublicRoute';

const SignUp = () => {
  const [email, setEmail] = useState('');
  return (
    <Layout variant={LayoutVariant.Entry}>
      {email ? (
        <ConfirmEmail email={email} />
      ) : (
        <SignUpForm setEmail={setEmail} />
      )}
    </Layout>
  );
};

export default withPublicRoute(SignUp);
