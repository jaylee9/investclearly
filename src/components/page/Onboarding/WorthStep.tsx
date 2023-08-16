import { Box, Typography } from '@mui/material';
import { useWorthStepStyles } from './styles';
import YesNoButtons from '@/components/common/YesNoButtons';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import { IncomeAndNetWorth } from '@/backend/constants/enums/income-and-worth';

const WorthStep = () => {
  const classes = useWorthStepStyles();
  const router = useRouter();
  const [worth, setWorth] = useState<'yes' | 'no'>(
    (localStorage.getItem('incomeAndNetWorth') as 'yes' | 'no') || 'yes'
  );
  const handleBackClick = () => {
    router.push('/onboarding?step=1');
  };
  const handleStepClick = (type: 'skip' | 'next') => {
    if (type === 'next') {
      localStorage.setItem(
        'incomeAndNetWorth',
        worth === 'yes'
          ? IncomeAndNetWorth.yesIHave
          : IncomeAndNetWorth.noIDoNotHave
      );
    }
    router.push('/onboarding?step=3');
  };
  return (
    <Box sx={classes.root}>
      <Box>
        <Typography variant="h4">Income and net worth</Typography>
        <Typography variant="body1" sx={classes.subTitle}>
          Tell us more about your income and net worth. You can change this
          later at any time
        </Typography>
        <Typography variant="body1">Do you have either:</Typography>
        <ul style={classes.list}>
          <li>
            <Typography variant="body1">
              Annual income in excess of{' '}
              <span style={classes.bold}>$200,000</span> as an individual or
              excess of <span style={classes.bold}>$300,000</span> joint income
              for the last 2 years and expect the same for the current year
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Household net worth exceeds <span style={classes.bold}>$1M</span>{' '}
              excluding your primary residence
            </Typography>
          </li>
        </ul>
        <YesNoButtons
          yesTitle="Yes, I have"
          noTitle="No, I don't have"
          activeValue={worth}
          onChange={setWorth}
        />
      </Box>
      <Box sx={classes.footer}>
        <Box>
          <Button variant="tertiary" onClick={handleBackClick}>
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="secondary" onClick={() => handleStepClick('skip')}>
            Skip
          </Button>
          <Button onClick={() => handleStepClick('next')}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WorthStep;
