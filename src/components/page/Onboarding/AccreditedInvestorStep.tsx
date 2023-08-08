import { Box, Typography } from '@mui/material';
import { useAccreditedInvestorStepStyles } from './styles';
import YesNoButtons from '@/components/common/YesNoButtons';
import { useState } from 'react';

const AccreditedInvestorStep = () => {
  const classes = useAccreditedInvestorStepStyles();
  const [accredited, setAccredited] = useState<'yes' | 'no'>('yes');
  return (
    <Box sx={classes.root}>
      <Typography variant="h4">Are you an accredited investor?</Typography>
      <Typography variant="body1">
        Tell us more about your investment background. You can change this later
        at any time
      </Typography>
      <YesNoButtons
        yesTitle="Yes, I am accredited"
        noTitle="No, I am not accredited"
        activeValue={accredited}
        onChange={setAccredited}
      />
    </Box>
  );
};

export default AccreditedInvestorStep;
