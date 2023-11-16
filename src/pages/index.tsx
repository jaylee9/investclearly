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
import {
  GlobalSearchResponse,
  getLocationsName,
  globalSearch,
} from '@/actions/common';
import { useState, type FC } from 'react';
import CreateReviewForm from '@/components/common/CreateReview';

interface HomeProps {
  deals: DealInterface[];
  sponsors: SponsorInterface[];
  searchResponse: GlobalSearchResponse;
  locations: string[];
}

const Home: FC<HomeProps> = ({
  deals,
  sponsors,
  searchResponse,
  locations,
}) => {
  const classes = useHomeStyles();

  const [openCreateReviewForm, setOpenCreateReviewForm] = useState(false);
  const handleOpenCreateReviewForm = () => setOpenCreateReviewForm(true);
  const handleCloseCreateReviewForm = () => setOpenCreateReviewForm(false);

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
          <DealsBlock locations={locations} />
        </Box>
        <BannerBlock
          title="Investing In a Real Estate Syndication or Fund?
Share Your Experience With Other Investors"
          buttonLabel="Leave a review"
          onButtonClick={handleOpenCreateReviewForm}
        />
        <CreateReviewForm
          open={openCreateReviewForm}
          onClose={handleCloseCreateReviewForm}
        />
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const dealsResponse = await getAllDeals({
    page: 1,
    pageSize: 4,
    limit: 4,
    statuses: ['Active'],
  });
  const sponsorsResponse = await getAllSponsors({ page: 1, pageSize: 4 });
  const searchResponse = await globalSearch({ search: '' });
  const locationsResponse = await getLocationsName({
    entityType: 'deal',
  });
  if (
    'error' in dealsResponse ||
    'error' in sponsorsResponse ||
    'error' in locationsResponse
  ) {
    return {
      notFound: true,
    };
  }
  const formattedLocations = locationsResponse.slice(0, 11);
  return {
    props: {
      deals: dealsResponse.deals,
      sponsors: sponsorsResponse.sponsors,
      searchResponse,
      locations: formattedLocations,
    },
  };
};

export default Home;
