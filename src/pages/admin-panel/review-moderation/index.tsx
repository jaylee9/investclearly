import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box } from '@mui/material';

const ReviewModerationPage = () => {
  return (
    <Layout variant={LayoutVariant.Admin}>
      <Box>Review moderation</Box>
    </Layout>
  );
};

export default ReviewModerationPage;
