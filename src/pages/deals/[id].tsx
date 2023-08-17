import { getDeal } from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import Button from '@/components/common/Button';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import ReviewCard from '@/components/common/ReviewCard';
import SkeletonImage from '@/components/common/SkeletonImage';
import AddDealModal from '@/components/page/Deal/Modals/AddDeal';
import ClaimDealModal from '@/components/page/Deal/Modals/ClaimDeal';
import SuggestEditModal from '@/components/page/Deal/Modals/SuggestEdit';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealPageStyles from '@/pages_styles/dealPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { SyntheticEvent, useRef, useState } from 'react';

const MOCK_SPONSOR_IMAGE_URL =
  'https://logos-download.com/wp-content/uploads/2016/03/LEGO_logo-700x700.png';

type ActiveTab = 'overview' | 'reviews';

interface DealPageProps {
  deal: DealInterface;
  reviews: ReviewInterface[];
}

const DealPage = ({ deal, reviews }: DealPageProps) => {
  const classes = useDealPageStyles();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [openModals, setOpenModals] = useState({
    claimDeal: false,
    addDeal: false,
    suggestEdit: false,
  });
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
      count: deal.reviewsCount,
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
        <Box sx={classes.imageWrapper}>
          {deal.attachments[0] && (
            <SkeletonImage
              alt="deal image"
              width={1200}
              height={400}
              src={deal.attachments[0].path}
            />
          )}
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
                      <Typography variant="body1">{deal.regulation}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Region</Typography>
                      <Typography variant="body1">
                        {Array.isArray(deal.regions)
                          ? deal.regions.join(', ')
                          : deal.regions}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.overviewDetailsColumn}>
                    <Box>
                      <Typography variant="caption">SEC Industry</Typography>
                      <Typography variant="body1">
                        {deal.secIndustry}
                      </Typography>
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
                  <Typography variant="body1">{deal.reviewsCount}</Typography>
                </Box>
                <Button>Write a review</Button>
              </Box>
              <Box sx={classes.reviewsContent}>
                {reviewsData.map(review => (
                  <ReviewCard review={review} key={review.id} />
                ))}
              </Box>
              {!!deal.reviewsCount && deal.reviewsCount > 3 && (
                <Typography variant="body1" sx={classes.showMoreReviews}>
                  Show more reviews <i className="icon-Caret-down"></i>
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={classes.rightColumn}>
            <Box>
              {!deal.sponsor ? (
                <Box sx={classes.textWithButton}>
                  <Typography variant="body1">
                    Sponsor is not currently aligned.
                  </Typography>
                  <Button onClick={() => handleOpenModal('claimDeal')}>
                    Claim deal
                  </Button>
                  <ClaimDealModal
                    open={openModals.claimDeal}
                    handleClose={() => handleCloseModal('claimDeal')}
                    onSubmit={data => console.log(data)}
                  />
                </Box>
              ) : (
                <Box sx={classes.sponsor}>
                  <PlaceholderImage
                    alt="sponsor avatar"
                    width={58}
                    height={58}
                    src={deal.sponsor.businessAvatar as string}
                    type="sponsor"
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
              <Button onClick={() => handleOpenModal('addDeal')}>
                Add to your profile
              </Button>
            </Box>
            <AddDealModal
              onSubmit={data => console.log(data)}
              open={openModals.addDeal}
              handleClose={() => handleCloseModal('addDeal')}
            />

            <Box sx={classes.textWithButton}>
              <Typography variant="body1">
                Does this deal contain any errors? Please help us maintain
                accurate information.
              </Typography>
              <Button onClick={() => handleOpenModal('suggestEdit')}>
                Suggest Edit
              </Button>
            </Box>
            <SuggestEditModal
              onSubmit={data => console.log(data)}
              open={openModals.suggestEdit}
              handleClose={() => handleCloseModal('suggestEdit')}
            />
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
