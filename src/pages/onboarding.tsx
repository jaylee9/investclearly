import Layout, { LayoutVariant } from '@/components/common/Layout';
import AccreditedInvestorStep from '@/components/page/Onboarding/AccreditedInvestorStep';
import useOnboardingPageStyles from '@/pages_styles/onboardingPageStyles';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Onboarding = () => {
  const router = useRouter();
  const { step } = router.query;
  const classes = useOnboardingPageStyles();
  return (
    <Layout variant={LayoutVariant.Entry}>
      <Box>
        <Typography variant="caption" sx={classes.stepTitle}>
          STEP {step} OF 3
        </Typography>
        {Number(step) === 1 && <AccreditedInvestorStep />}
      </Box>
    </Layout>
  );
};

export default Onboarding;
