import { getDeal } from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealPageStyles from '@/pages_styles/dealPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { SyntheticEvent, useRef, useState } from 'react';

type ActiveTab = 'overview' | 'reviews';

interface DealPageProps {
  deal: DealInterface;
  reviews: ReviewInterface[];
}

const DealPage = ({ deal, reviews }: DealPageProps) => {
  const classes = useDealPageStyles();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
    },
    {
      value: 'reviews',
      label: 'Reviews',
      count: reviews.length,
    },
  ];
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    if (newValue === 'overview' && overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (newValue === 'reviews' && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(newValue as ActiveTab);
  };

  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.leftColumn}>
          <Box sx={classes.info}>
            <Box sx={classes.infoHeader}>
              <Box>
                <Typography variant="h3">{deal.dealLegalName}</Typography>
                <Typography variant="body1">{deal.dealAddress}</Typography>
              </Box>
              <div>
                <i className="icon-Saved"></i>
              </div>
            </Box>
            <Box sx={classes.infoContent}>
              <Box sx={classes.infoContentColumn}>
                <Box sx={classes.infoContentDetail}>
                  <i className="icon-Location"></i>
                  <Box>
                    <Typography variant="caption">Address</Typography>
                    <Typography variant="body1">{deal.dealAddress}</Typography>
                  </Box>
                </Box>
                <Box sx={classes.infoContentDetail}>
                  <i className="icon-Status"></i>
                  <Box>
                    <Typography variant="caption">Status</Typography>
                    <Typography variant="body1">{deal.status}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={classes.infoContentColumn}>
                <Box sx={classes.infoContentDetail}>
                  <i className="icon-Investment"></i>
                  <Box>
                    <Typography variant="caption">
                      Minimum Investment
                    </Typography>
                    <Typography variant="body1">
                      {deal.minimumInvestment}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={classes.infoContentDetail}>
                  <i className="icon-Asset-class"></i>
                  <Box>
                    <Typography variant="caption">Asset Class</Typography>
                    <Typography variant="body1">{deal.assetClass}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <CustomTabs
              tabs={tabs}
              onChange={handleTabChange}
              value={activeTab}
            />
          </Box>
          <Box ref={overviewRef} sx={classes.overview}>
            <Box sx={classes.overviewHeader}>
              <Typography variant="h3">Overview</Typography>
              <Typography variant="body1">{deal.description}</Typography>
            </Box>
            <Box sx={classes.overviewContent}>
              <Typography variant="h5">Details</Typography>
              <Box sx={classes.overviewDetails}>
                <Box sx={classes.overviewDetailsColumn}>
                  <Box>
                    <Typography variant="caption">Legal Name</Typography>
                    <Typography variant="body1">
                      {deal.dealLegalName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Regulation</Typography>
                    {/* mock data, add after back-end implementation */}
                    <Typography variant="body1">D</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Region</Typography>
                    <Typography variant="body1">{deal.region}</Typography>
                  </Box>
                </Box>
                <Box sx={classes.overviewDetailsColumn}>
                  <Box>
                    <Typography variant="caption">SEC Industry</Typography>
                    {/* mock data, add after back-end implementation */}
                    <Typography variant="body1">Industry 1</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Exemption</Typography>
                    <Typography variant="body1">{deal.exemption}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box ref={reviewsRef}>
            <Box>123</Box>
          </Box>
        </Box>
        <Box sx={classes.rightColumn}></Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id as string;
  const dealResponse = await getDeal({ id });
  if (!dealResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      reviews: dealResponse.reviews,
      deal: dealResponse,
    },
  };
};

export default DealPage;
