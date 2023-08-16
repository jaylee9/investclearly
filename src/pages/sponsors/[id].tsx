import { getSponsor } from '@/actions/sponsors';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import Button from '@/components/common/Button';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import ReviewCard from '@/components/common/ReviewCard';
import useHeaderProps from '@/hooks/useHeaderProps';
import useSponsorPageStyles from '@/pages_styles/sponsorPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { SyntheticEvent, useRef, useState } from 'react';

type ActiveTab = 'overview' | 'reviews';

interface SponsorPageProps {
  sponsor: SponsorInterface;
  reviews: ReviewInterface[];
}

const SponsorPage = ({ sponsor, reviews }: SponsorPageProps) => {
  const classes = useSponsorPageStyles();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [openModals, setOpenModals] = useState({
    claimDeal: false,
    addDeal: false,
    suggestEdit: false,
  });
  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const [reviewsData] = useState(reviews);

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
    } else if (newValue === 'reviews' && dealsRef.current) {
      dealsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(newValue as ActiveTab);
  };
  const handleOpenModal = (key: 'claimDeal' | 'addDeal' | 'suggestEdit') => {
    setOpenModals(prevModals => {
      return { ...prevModals, [key]: true };
    });
  };

  const handleCloseModal = (key: 'claimDeal' | 'addDeal' | 'suggestEdit') => {
    setOpenModals(prevModals => {
      return { ...prevModals, [key]: false };
    });
  };

  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  return (
    <Layout {...headerProps}>
      <Box>
        <Box sx={classes.info}>
          <Box sx={classes.infoHeader}>
            <Box>
              <Typography variant="h3">{sponsor.legalName}</Typography>
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
                  <Typography variant="caption">Region</Typography>
                  <Typography variant="body1">
                    {Array.isArray(sponsor.regions)
                      ? sponsor.regions.join(', ')
                      : sponsor.regions}
                  </Typography>
                </Box>
              </Box>
              <Box sx={classes.infoContentDetail}>
                <i className="icon-Asset-class"></i>
                <Box>
                  <Typography variant="caption">Asset Class</Typography>
                  <Typography variant="body1">
                    {Array.isArray(sponsor.specialties)
                      ? sponsor.specialties.join(', ')
                      : sponsor.specialties}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={classes.infoContentColumn}>
              <Box sx={classes.infoContentDetail}>
                <i className="icon-Calendar"></i>
                <Box>
                  <Typography variant="caption">Year Founded</Typography>
                  <Typography variant="body1">123</Typography>
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
        <Box sx={classes.root}>
          <Box sx={classes.leftColumn}>
            <Box ref={overviewRef} sx={classes.overview}>
              <Box sx={classes.overviewHeader}>
                <Typography variant="h3">Sponsor Overview</Typography>
                <Typography variant="body1">{sponsor.description}</Typography>
              </Box>
              <Box sx={classes.overviewContent}>
                <Typography variant="h5">Details</Typography>
                <Box sx={classes.overviewDetails}>
                  <Box sx={classes.overviewDetailsColumn}>
                    <Box>
                      <Typography variant="caption">Legal Name</Typography>
                      <Typography variant="body1">
                        {sponsor.legalName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Interested in</Typography>
                      <Typography variant="body1">
                        {Array.isArray(sponsor.interests)
                          ? sponsor.interests.join(', ')
                          : sponsor.interests}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box ref={reviewsRef} sx={classes.reviewsWrapper}>
              <Box sx={classes.reviewsWrapperHeader}>
                <Box sx={classes.reviewsWrapperTitle}>
                  <Typography variant="h3">Reviews</Typography>
                  <Typography variant="body1">{reviewsData?.length}</Typography>
                </Box>
                <Button>Write a review</Button>
              </Box>
              <Box sx={classes.reviewsContent}>
                {reviewsData.map(review => (
                  <ReviewCard review={review} key={review.id} />
                ))}
              </Box>
              <Typography variant="body1" sx={classes.showMoreReviews}>
                Show more reviews <i className="icon-Caret-down"></i>
              </Typography>
            </Box>
          </Box>

          <Box sx={classes.rightColumn}>
            <Box sx={classes.sponsorInfo}>
              <Box sx={classes.sponsorInfoRow}>
                <Box>
                  <Typography variant="caption">Raising</Typography>
                  <Typography variant="body1">
                    ${sponsor.activelyRising ? 'Yes' : 'No'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Average IRR</Typography>
                  <Typography variant="body1">{sponsor.actualIRR}%</Typography>
                </Box>
              </Box>
              <Box sx={classes.sponsorInfoRow}>
                <Box>
                  <Typography variant="caption">
                    Average Equity Multiple
                  </Typography>
                  <Typography variant="body1">
                    {sponsor.equityMultiple}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">AUM</Typography>
                  <Typography variant="body1">$ {sponsor.aum}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={classes.textWithButton}>
              <Typography variant="body1">
                Is Cloud Investment Ltd your company?
              </Typography>
              <Button onClick={() => handleOpenModal('addDeal')}>
                Claim this profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id as string;
  const sponsorResponse = await getSponsor({ id });
  if (!sponsorResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      reviews: sponsorResponse.reviews,
      sponsor: sponsorResponse,
    },
  };
};

export default SponsorPage;
