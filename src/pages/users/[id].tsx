import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import { Box } from '@mui/material';

const PublicUserPage = () => {
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isFixed: true,
  });
  return (
    <Layout {...headerProps}>
      <Box></Box>
    </Layout>
  );
};

export default PublicUserPage;
