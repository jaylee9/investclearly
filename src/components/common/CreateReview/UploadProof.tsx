import { Box, Typography } from '@mui/material';
import { useUploadProofStepStyles } from './styles';

const UploadProofStep = () => {
  const classes = useUploadProofStepStyles();
  return (
    <Box sx={classes.root}>
      <Typography variant="h4" fontWeight={600}>
        Upload proof that you have worked with this sponsor
      </Typography>
      <Typography variant="body1" sx={classes.subTitle}>
        Attach any documents or screenshots that prove your involvement with
        Cloud Investment Ltd.
      </Typography>
    </Box>
  );
};

export default UploadProofStep;
