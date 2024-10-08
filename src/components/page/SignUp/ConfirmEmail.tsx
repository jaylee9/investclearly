import { Box, Typography } from '@mui/material';
import { useConfirmEmailStyles } from './styles';
import VerificationInput from 'react-verification-input';
import { confirmEmail } from '@/actions/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@/contexts/User';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';

interface ConfirmEmailProps {
  email: string;
}

const ConfirmEmail = ({ email }: ConfirmEmailProps) => {
  const [error, setError] = useState(false);
  const classes = useConfirmEmailStyles();
  const router = useRouter();
  const { setUser } = useUser();
  const onComplete = async (confirmationCode: string) => {
    const response = await confirmEmail({ confirmationCode });
    if ('error' in response) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    } else {
      setUser(response as PublicUserInterface);
      router.push('/onboarding');
    }
  };
  return (
    <Box sx={classes.root}>
      <Typography variant="h2" fontWeight={600} marginBottom="8px">
        Confirm your email
      </Typography>
      <Typography variant="body1" sx={classes.infoText}>
        Enter temporary code we’ve sent to <br /> <span>{email}</span>
      </Typography>
      <Box sx={classes.verificationInputWrapper}>
        <VerificationInput
          length={6}
          onComplete={code => onComplete(code)}
          validChars="0-9"
          placeholder=""
          classNames={{
            character: `${
              error ? 'vi__character vi__character-error' : 'vi__character'
            }`,
          }}
        />
      </Box>
      <Typography variant="body1">
        Didn’t receive confirmation code?{' '}
        <span style={classes.sendAgainText}>Send again</span>
      </Typography>
    </Box>
  );
};

export default ConfirmEmail;
