import Layout, { LayoutVariant } from '@/components/common/Layout';
import AccreditedInvestorStep from '@/components/page/Onboarding/AccreditedInvestorStep';
import WorthStep from '@/components/page/Onboarding/WorthStep';
import useOnboardingPageStyles from '@/pages_styles/onboardingPageStyles';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Onboarding = () => {
  const router = useRouter();
  const { step } = router.query;
  const classes = useOnboardingPageStyles();
  return (
    <Layout variant={LayoutVariant.Entry} isEntrySpacing>
      <Box sx={classes.wrapper}>
        <Typography variant="caption" sx={classes.stepTitle}>
          STEP {step} OF 3
        </Typography>
        {Number(step) === 1 && <AccreditedInvestorStep />}
        {Number(step) === 2 && <WorthStep />}
      </Box>
    </Layout>
  );
};

export default Onboarding;
