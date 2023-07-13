import { Box, Typography } from '@mui/material';
import { useConfirmEmailStyles } from './styles';
import VerificationInput from 'react-verification-input';

interface ConfirmEmailProps {
  email: string;
}

const ConfirmEmail = ({ email }: ConfirmEmailProps) => {
  const classes = useConfirmEmailStyles();
  return (
    <Box>
      <Typography variant="h2" fontWeight={600} marginBottom="8px">
        Confirm your email
      </Typography>
      <Typography variant="body1" sx={classes.infoText}>
        Enter temporary code we’ve sent to <br /> <span>{email}</span>
      </Typography>
      <Box sx={classes.verificationInputWrapper}>
        <VerificationInput
          length={6}
          onComplete={code => {
            console.log(code);
          }}
          validChars="0-9"
          placeholder=""
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
