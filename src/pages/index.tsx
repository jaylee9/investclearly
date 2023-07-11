import getHomeStyles from './homeStyles';
import Layout from '@/components/common/Layout';
import DealsBlock from '@/components/page/Home/DealsBlock';
import HeadBlock from '@/components/page/Home/HeadBlock';
import NewDealsBlock from '@/components/page/Home/NewDealsBlock';
import TopRatedSponsorsBlock from '@/components/page/Home/TopRatedSponsorsBlock';
import WriteReviewBlock from '@/components/page/Home/WriteReviewBlock';
import useHeaderProps from '@/hooks/useHeaderProps';
import { Box } from '@mui/material';

const Home = () => {
  const classes = getHomeStyles();
  const headerProps = useHeaderProps({
    type: 'light',
    isLinks: true,
    isShadow: false,
    isSignIn: true,
    logoVariant: 'light-text',
  });
  return (
    <Layout {...headerProps}>
      <HeadBlock />
      <Box sx={classes.root}>
        <Box sx={classes.content}>
          <NewDealsBlock />
          <TopRatedSponsorsBlock />
          <DealsBlock />
        </Box>
        <WriteReviewBlock />
      </Box>
    </Layout>
  );
};

export default Home;
