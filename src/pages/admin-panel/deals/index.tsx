import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box } from '@mui/material';

const DealsPage = () => {
  return (
    <Layout variant={LayoutVariant.Admin}>
      <Box>Deals</Box>
    </Layout>
  );
};

export default DealsPage;
