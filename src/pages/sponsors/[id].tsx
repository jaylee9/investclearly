import { getSponsor } from '@/actions/sponsors';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import Button from '@/components/common/Button';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import ReviewCard from '@/components/common/ReviewCard';
import useHeaderProps from '@/hooks/useHeaderProps';
import useSponsorPageStyles from '@/pages_styles/sponsorPageStyles';
import { Box, Fade, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import DealCard from '@/components/common/DealCard';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import ClaimCompanyModal from '@/components/page/Sponsor/Modals/ClaimCompany';

type ActiveTab = 'overview' | 'reviews';

interface SponsorPageProps {
  sponsor: SponsorInterface;
  deals: DealInterface[];
  reviews: ReviewInterface[];
}

const SponsorPage = ({ sponsor, reviews, deals }: SponsorPageProps) => {
  const classes = useSponsorPageStyles();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const [reviewsData] = useState(reviews);
  const [dealsData] = useState(deals);

  const [isFixedHeader, setFixedHeader] = useState(false);
  const checkSticky = () => {
    if (overviewRef.current) {
      const rect = overviewRef.current.getBoundingClientRect();
      setFixedHeader(rect.top <= 0);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', checkSticky);
    return () => {
      window.removeEventListener('scroll', checkSticky);
    };
  }, []);

  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
    },
    {
      value: 'deals',
      label: 'Deals',
      count: sponsor.dealsCount,
    },
    {
      value: 'reviews',
      label: 'Reviews',
      count: sponsor.reviewsCount,
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
    } else if (newValue === 'deals' && dealsRef.current) {
      dealsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(newValue as ActiveTab);
  };
  const handleOpenModal = () => {
    setOpenClaimModal(true);
  };

  const handleCloseModal = () => {
    setOpenClaimModal(false);
  };

  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  return (
    <Layout {...headerProps}>
      <Fade in={isFixedHeader}>
        <Box sx={classes.fixedHeader}>
          <Box sx={classes.fixedHeaderInfo}>
            <PlaceholderImage
              alt="sponsor image"
              width={56}
              height={56}
              src={sponsor.businessAvatar as string}
              defaultImage={DEFAULT_SPONSOR_IMAGE}
              style={{ borderRadius: '1230px' }}
            />
            <Box>
              <Typography variant="h5">{sponsor.legalName}</Typography>
              <Typography variant="body1" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                {sponsor.avgTotalRating}
                <span>({sponsor.reviewsCount})</span>
              </Typography>
            </Box>
          </Box>
          <CustomTabs
            tabs={tabs}
            onChange={handleTabChange}
            value={activeTab}
          />
          <Box sx={classes.infoHeaderActions}>
            <i className="icon-Saved"></i>
            <Button variant="secondary">
              <Box sx={classes.websiteButton}>
                <i className="icon-Link"></i>Website
              </Box>
            </Button>
          </Box>
        </Box>
      </Fade>
      <Box sx={classes.wrapper}>
        <Box sx={classes.info}>
          <Box sx={classes.infoHeader}>
            <Box sx={classes.infoHeaderMain}>
              <PlaceholderImage
                alt="sponsor image"
                src={sponsor.businessAvatar as string}
                width={80}
                height={80}
                defaultImage={DEFAULT_SPONSOR_IMAGE}
                style={{
                  borderRadius: '1230px',
                  minHeight: '80px',
                  maxWidth: '80px',
                }}
              />
              <Box>
                <Typography variant="h3">{sponsor.legalName}</Typography>
                <Typography variant="body1" sx={classes.sponsorRating}>
                  <i className="icon-Star"></i>
                  {sponsor.avgTotalRating}
                  <span>({sponsor.reviewsCount} reviews)</span>
                </Typography>
              </Box>
            </Box>
            <Box sx={classes.infoHeaderActions}>
              <i className="icon-Saved"></i>
              <Button variant="secondary">
                <Box sx={classes.websiteButton}>
                  <i className="icon-Link"></i>Website
                </Box>
              </Button>
            </Box>
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
                  <Typography variant="body1">2002</Typography>
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
                  <Box sx={classes.overviewDetailswrapper}>
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

            <Box ref={dealsRef} sx={classes.overview}>
              <Box sx={classes.dealsBlockHeader}>
                <Typography variant="h3">Deals</Typography>
                <Typography variant="body1">{sponsor?.dealsCount}</Typography>
              </Box>
              <Box sx={classes.dealsBlockContent}>
                {dealsData?.map(deal => (
                  <DealCard key={deal.id} deal={deal} sx={classes.dealCard} />
                ))}
              </Box>
              {!!sponsor.dealsCount && sponsor.dealsCount > 3 && (
                <Typography variant="body1" sx={classes.showMoreLink}>
                  Show more deals <i className="icon-Caret-down"></i>
                </Typography>
              )}
            </Box>

            <Box ref={reviewsRef} sx={classes.reviewsWrapper}>
              <Box sx={classes.reviewsWrapperHeader}>
                <Box sx={classes.reviewsWrapperTitle}>
                  <Typography variant="h3">Reviews</Typography>
                  <Typography variant="body1">
                    {sponsor?.reviewsCount}
                  </Typography>
                </Box>
                <Button>Write a review</Button>
              </Box>
              <Box sx={classes.reviewsContent}>
                {reviewsData.map(review => (
                  <ReviewCard review={review} key={review.id} />
                ))}
              </Box>
              {!!sponsor.reviewsCount && sponsor.reviewsCount > 3 && (
                <Typography variant="body1" sx={classes.showMoreLink}>
                  Show more reviews <i className="icon-Caret-down"></i>
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={classes.rightColumn}>
            <Box sx={classes.sponsorInfo}>
              <Box sx={classes.sponsorInfoColumn}>
                <Box>
                  <Typography variant="caption">Raising</Typography>
                  <Typography variant="body1">
                    {sponsor.activelyRising ? 'Yes' : 'No'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">
                    Average Equity Multiple
                  </Typography>
                  <Typography variant="body1">
                    {sponsor.equityMultiple}
                  </Typography>
                </Box>
              </Box>
              <Box sx={classes.sponsorInfoColumn}>
                <Box>
                  <Typography variant="caption">Average IRR</Typography>
                  <Typography variant="body1">{sponsor.actualIRR}%</Typography>
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
              <Button onClick={handleOpenModal}>Claim this profile</Button>
            </Box>
            <ClaimCompanyModal
              onSubmit={data => console.log(data)}
              open={openClaimModal}
              handleClose={handleCloseModal}
            />
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
      // splice will be removed after added logic on back end side
      deals: sponsorResponse.deals?.splice(1, 4),
      sponsor: sponsorResponse,
    },
  };
};

export default SponsorPage;
