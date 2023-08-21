import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import usePublicUserPageStyles from '@/pages_styles/publicUserPageStyles';
import { Box } from '@mui/material';

const PublicUserPage = () => {
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isFixed: true,
  });
  const classes = usePublicUserPageStyles();
  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.userInfo}></Box>
      </Box>
    </Layout>
  );
};

export default PublicUserPage;
