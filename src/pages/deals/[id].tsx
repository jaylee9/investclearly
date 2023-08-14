import { getDeal } from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import Button from '@/components/common/Button';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import ReviewCard from '@/components/common/ReviewCard';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealPageStyles from '@/pages_styles/dealPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { SyntheticEvent, useRef, useState } from 'react';

const MOCK_SPONSOR_IMAGE_URL =
  'https://logos-download.com/wp-content/uploads/2016/03/LEGO_logo-700x700.png';
const MOCK_DEAL_IMAGE_URL =
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

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
      <Box>
        <Box sx={classes.imageWrapper}>
          <Image
            alt="deal image"
            width={1200}
            height={400}
            src={MOCK_DEAL_IMAGE_URL}
          />
        </Box>

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
                      <Typography variant="body1">
                        {deal.dealAddress}
                      </Typography>
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
            <Box>
              {!deal.sponsor ? (
                <Box sx={classes.textWithButton}>
                  <Typography variant="body1">
                    Sponsor is not currently aligned.
                  </Typography>
                  <Button>Claim deal</Button>
                </Box>
              ) : (
                <Box sx={classes.sponsor}>
                  <Image
                    alt="sponsor avatar"
                    width={58}
                    height={58}
                    src={MOCK_SPONSOR_IMAGE_URL}
                  />
                  <Box>
                    <Typography variant="h5">
                      {deal.sponsor.legalName}
                    </Typography>
                    <Typography variant="body1" sx={classes.sponsorRating}>
                      <i className="icon-Star"></i>
                      {deal.sponsor.avgTotalRating}{' '}
                      <span>({deal.sponsor.reviewsCount})</span>
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={classes.sponsorInfo}>
              <Box sx={classes.sponsorInfoRow}>
                <Box>
                  <Typography variant="caption">Target Raise</Typography>
                  <Typography variant="body1">${deal.targetRaise}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Fees</Typography>
                  <Typography variant="body1">{deal.fees}%</Typography>
                </Box>
              </Box>
              {deal.sponsor && (
                <>
                  <Box sx={classes.sponsorInfoRow}>
                    <Box>
                      <Typography variant="caption">Cash-on-Cash</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.cashOnCash}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Equity Multiple</Typography>
                      <Typography variant="body1">
                        x{deal.sponsor.equityMultiple}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.sponsorInfoRow}>
                    <Box>
                      <Typography variant="caption">Investment Type</Typography>
                      <Typography variant="body1">
                        {Array.isArray(deal.sponsor.investmentStructures)
                          ? deal.sponsor.investmentStructures.join(', ')
                          : deal.sponsor.investmentStructures}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Hold Period</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.holdPeriod}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.sponsorInfoRow}>
                    <Box>
                      <Typography variant="caption">Target IRR</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.targetIRR}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Actual IRR</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.actualIRR}%
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>

            <Box sx={classes.textWithButton}>
              <Typography variant="body1">Already invested?</Typography>
              <Button>Add to your profile</Button>
            </Box>

            <Box sx={classes.textWithButton}>
              <Typography variant="body1">
                Does this deal contain any errors? Please help us maintain
                accurate information.
              </Typography>
              <Button>Suggest Edit</Button>
            </Box>
          </Box>
        </Box>
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
