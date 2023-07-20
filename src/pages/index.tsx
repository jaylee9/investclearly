import { LogoVariant } from '@/assets/components/Logo';
import useHomeStyles from '../pages_styles/homeStyles';
import Layout from '@/components/common/Layout';
import DealsBlock from '@/components/page/Home/DealsBlock';
import HeadBlock from '@/components/page/Home/HeadBlock';
import NewDealsBlock from '@/components/page/Home/NewDealsBlock';
import TopRatedSponsorsBlock from '@/components/page/Home/TopRatedSponsorsBlock';
import useHeaderProps from '@/hooks/useHeaderProps';
import { Box } from '@mui/material';
import BannerBlock from '@/components/page/Home/BannerBlock';

const Home = () => {
  const classes = useHomeStyles();
  const headerProps = useHeaderProps({
    type: 'light',
    isLinks: true,
    isShadow: false,
    isSignIn: true,
    logoVariant: LogoVariant.LightText,
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
        <BannerBlock
          title="Investing In a Real Estate Syndication or Fund?
Share Your Experience With Other Investors"
          buttonLabel="Write a review"
          buttonHref="/create_review"
          isMarginBottom={true}
        />
      </Box>
    </Layout>
  );
};

export default Home;
