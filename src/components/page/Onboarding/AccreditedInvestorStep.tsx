import { Box, Typography } from '@mui/material';
import { useAccreditedInvestorStepStyles } from './styles';
import YesNoButtons from '@/components/common/YesNoButtons';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';

const AccreditedInvestorStep = () => {
  const classes = useAccreditedInvestorStepStyles();
  const router = useRouter();
  const [accredited, setAccredited] = useState<'yes' | 'no'>(
    (localStorage.getItem('accredited') as 'yes' | 'no') || 'yes'
  );
  const handleStepClick = (type: 'skip' | 'next') => {
    if (type === 'next') {
      localStorage.setItem('accredited', accredited);
    }
    router.push('/onboarding?step=2');
  };
  return (
    <Box sx={classes.root}>
      <Box>
        <Typography variant="h4">Are you an accredited investor?</Typography>
        <Typography variant="body1" sx={classes.subTitle}>
          Tell us more about your investment background. You can change this
          later at any time
        </Typography>
        <YesNoButtons
          yesTitle="Yes, I am accredited"
          noTitle="No, I am not accredited"
          activeValue={accredited}
          onChange={setAccredited}
        />
      </Box>
      <Box sx={classes.footer}>
        <Button variant="secondary" onClick={() => handleStepClick('skip')}>
          Skip
        </Button>
        <Button onClick={() => handleStepClick('next')}>Next</Button>
      </Box>
    </Box>
  );
};

export default AccreditedInvestorStep;
