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
import { getAllDeals } from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import { getAllSponsors } from '@/actions/sponsors';
import { GlobalSearchResponse, globalSearch } from '@/actions/common';
import type { FC } from 'react';

interface HomeProps {
  deals: DealInterface[];
  sponsors: SponsorInterface[];
  searchResponse: GlobalSearchResponse;
}

const Home: FC<HomeProps> = ({ deals, sponsors, searchResponse }) => {
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
      <HeadBlock searchResponse={searchResponse} />
      <Box sx={classes.root}>
        <Box sx={classes.content}>
          <TopRatedSponsorsBlock sponsors={sponsors} />
          <NewDealsBlock deals={deals} />
          <DealsBlock />
        </Box>
        <BannerBlock
          title="Investing In a Real Estate Syndication or Fund?
Share Your Experience With Other Investors"
          buttonLabel="Write a review"
          buttonHref="/create_review"
        />
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const dealsResponse = await getAllDeals({
    page: 1,
    pageSize: 4,
  });
  const sponsorsResponse = await getAllSponsors({ page: 1, pageSize: 4 });
  const searchResponse = await globalSearch({ search: '' });
  if ('error' in dealsResponse || !sponsorsResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      deals: dealsResponse.deals,
      sponsors: sponsorsResponse.sponsors,
      searchResponse,
    },
  };
};

export default Home;
