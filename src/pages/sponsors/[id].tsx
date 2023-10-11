import {
  addSponsorToBookmark,
  claimSponsor,
  deleteSponsorFromBookmarks,
  getSponsor,
} from '@/actions/sponsors';
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
import { type FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import DealCard from '@/components/common/DealCard';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import ClaimCompanyModal from '@/components/page/Sponsor/Modals/ClaimCompany';
import CreateReviewForm from '@/components/common/CreateReview';
import { useQuery } from 'react-query';
import Loading from '@/components/common/Loading';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import EllipsisText from '@/components/common/EllipsisText';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/User';
import { ClaimPayload } from '@/types/common';
import Link from 'next/link';

type ActiveTab = 'overview' | 'reviews';

interface SponsorPageProps {
  sponsor: SponsorInterface;
  deals: DealInterface[];
  reviews: ReviewInterface[];
}

const SponsorPage: FC<SponsorPageProps> = ({ sponsor, reviews, deals }) => {
  const classes = useSponsorPageStyles();
  const router = useRouter();
  const { user } = useUser();
  const { isMobile, isDesktop } = useBreakpoints();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const [showCreateReviewForm, setShowCreateReviewForm] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const [reviewsData, setReviewsData] = useState(reviews);
  const [dealsData, setDealsData] = useState(deals);
  const [reviewsLimit, setReviewsLimit] = useState(3);
  const [isInBookmarks, setIsInBookmarks] = useState(sponsor.isInBookmarks);

  const handleAddBookmark = async (entityId: number) => {
    if (!!user) {
      setIsInBookmarks(true);
      const response = await addSponsorToBookmark({ entityId });
      if ('error' in response) {
        setIsInBookmarks(false);
      }
    } else {
      router.push('/login');
    }
  };

  const handleDeleteBookmark = async (entityId: number) => {
    setIsInBookmarks(false);
    const response = await deleteSponsorFromBookmarks({ entityId });
    if ('error' in response) {
      setIsInBookmarks(true);
    }
  };

  const fetchReviews = async () => {
    const response = (await getSponsor({
      id: String(sponsor.id),
      reviewsLimit,
      dealsLimit,
    })) as SponsorInterface;
    return response.reviews;
  };
  const { isLoading: isLoadingReviews } = useQuery(
    ['sponsorReviews', reviewsLimit],
    fetchReviews,
    {
      onSuccess: response => {
        setReviewsData(response as ReviewInterface[]);
      },
      enabled: reviewsLimit > 3,
    }
  );
  const handleShowMoreReviews = () =>
    setReviewsLimit(prevLimit => prevLimit + 3);

  const [dealsLimit, setDealsLimit] = useState(3);
  const fetchDeals = async () => {
    const response = (await getSponsor({
      id: String(sponsor.id),
      reviewsLimit,
      dealsLimit,
    })) as SponsorInterface;
    return response.deals;
  };
  const { isLoading: isLoadingDeals } = useQuery(
    ['sponsorDeals', dealsLimit],
    fetchDeals,
    {
      onSuccess: response => {
        setDealsData(response as DealInterface[]);
      },
      enabled: dealsLimit > 3,
    }
  );
  const handleShowMoreDeals = () => setDealsLimit(prevLimit => prevLimit + 3);

  const [isStickyHeader, setFixedHeader] = useState(false);
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
    let elementToScrollTo: HTMLDivElement | null = null;
    if (newValue === 'overview' && overviewRef.current) {
      elementToScrollTo = overviewRef.current;
    } else if (newValue === 'reviews' && reviewsRef.current) {
      elementToScrollTo = reviewsRef.current;
    } else if (newValue === 'deals' && dealsRef.current) {
      elementToScrollTo = dealsRef.current;
    }

    if (elementToScrollTo) {
      const integerHeight = newValue === 'overview' ? 30 : 50;
      const headerHeight = isStickyHeader ? integerHeight : 0;
      window.scrollTo({
        top:
          elementToScrollTo.getBoundingClientRect().top +
          window.scrollY -
          headerHeight,
        behavior: 'smooth',
      });
    }

    setActiveTab(newValue as ActiveTab);
  };
  const handleOpenModal = () => {
    if (!!user) {
      setOpenClaimModal(true);
    } else {
      router.push('/login');
    }
  };

  const handleCloseModal = () => {
    setOpenClaimModal(false);
  };

  const handleShowCreateReviewForm = () => {
    if (!!user) {
      setShowCreateReviewForm(true);
    } else {
      router.push('/login');
    }
  };

  const handleHideCreateReviewForm = () => {
    setShowCreateReviewForm(false);
  };

  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isShadow: isDesktop || isMobile,
    isShadowInFront: isDesktop || isMobile,
  });

  const dealsDataSliceCondition =
    isMobile && dealsData.length === 3 ? 1 : dealsData.length;

  const onSubmitClaimSponsor = async (data: ClaimPayload) => {
    await claimSponsor(data);
  };

  return (
    <Layout {...headerProps}>
      <Fade in={isStickyHeader}>
        <Box sx={classes.fixedHeader}>
          {isDesktop && (
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
                <EllipsisText
                  variant="h5"
                  width="186px"
                  text={sponsor.legalName}
                />
                <Typography variant="body1" sx={classes.sponsorRating}>
                  <i className="icon-Star"></i>
                  {sponsor.avgTotalRating}
                  <span>({sponsor.reviewsCount})</span>
                </Typography>
              </Box>
            </Box>
          )}
          <CustomTabs
            tabs={tabs}
            onChange={handleTabChange}
            value={activeTab}
            sxCustomRootStyles={classes.customTabs}
          />
          {!isMobile && (
            <Box sx={classes.infoHeaderActions}>
              {isInBookmarks ? (
                <BookmarkIcon
                  sx={classes.filledBookmarkIcon}
                  onClick={() => handleDeleteBookmark(sponsor.id)}
                />
              ) : (
                <BookmarkBorderIcon
                  sx={classes.bookmarkIcon}
                  onClick={() => handleAddBookmark(sponsor.id)}
                />
              )}
              {sponsor.website && (
                <Button variant="secondary">
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box sx={classes.websiteButton}>
                      <i className="icon-Link"></i>Website
                    </Box>
                  </Link>
                </Button>
              )}
            </Box>
          )}
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
              {isInBookmarks ? (
                <BookmarkIcon
                  sx={classes.filledBookmarkIcon}
                  onClick={() => handleDeleteBookmark(sponsor.id)}
                />
              ) : (
                <BookmarkBorderIcon
                  sx={classes.bookmarkIcon}
                  onClick={() => handleAddBookmark(sponsor.id)}
                />
              )}
              {!isMobile && sponsor.website && (
                <Button variant="secondary">
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box sx={classes.websiteButton}>
                      <i className="icon-Link"></i>Website
                    </Box>
                  </Link>
                </Button>
              )}
            </Box>
          </Box>
          {isMobile && sponsor.website && (
            <Button variant="secondary">
              <Link
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box sx={classes.websiteButton}>
                  <i className="icon-Link"></i>Website
                </Box>
              </Link>
            </Button>
          )}
          <Box sx={classes.infoContent}>
            <Box sx={classes.infoContentColumn}>
              <Box sx={classes.infoContentDetail}>
                <i className="icon-Location"></i>
                <Box>
                  <Typography variant="caption">State</Typography>
                  <Typography variant="body1">
                    {!!sponsor?.locations?.length
                      ? sponsor?.locations?.[0]?.stateOrCountryDescription
                      : 'N/A'}
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
                  <Typography variant="body1">
                    {sponsor.yearOfFoundation}
                  </Typography>
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

            <Box ref={dealsRef} sx={classes.dealsOverview}>
              <Box sx={classes.dealsBlockHeader}>
                <Typography variant="h3">Deals</Typography>
                <Typography variant="body1">{sponsor?.dealsCount}</Typography>
              </Box>
              <Box sx={classes.dealsBlockContent}>
                {dealsData
                  .slice(0, dealsDataSliceCondition)
                  ?.map(deal => (
                    <DealCard key={deal.id} deal={deal} sx={classes.dealCard} />
                  ))}
              </Box>
              {!!sponsor.dealsCount &&
                sponsor.dealsCount > dealsLimit &&
                !isLoadingDeals && (
                  <Typography
                    variant="body1"
                    sx={classes.showMoreLink}
                    onClick={handleShowMoreDeals}
                  >
                    Show more deals <i className="icon-Caret-down"></i>
                  </Typography>
                )}
              {isLoadingDeals && (
                <Box>
                  <Loading />
                </Box>
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
                <Button onClick={handleShowCreateReviewForm}>
                  <Typography variant="body1">Write a review</Typography>
                </Button>
                <CreateReviewForm
                  open={showCreateReviewForm}
                  onClose={handleHideCreateReviewForm}
                />
              </Box>
              <Box sx={classes.reviewsContent}>
                {reviewsData.map(review => (
                  <ReviewCard review={review} key={review.id} />
                ))}
              </Box>
              {!!sponsor.reviewsCount &&
                sponsor.reviewsCount > reviewsLimit &&
                !isLoadingReviews && (
                  <Typography
                    variant="body1"
                    sx={classes.showMoreLink}
                    onClick={handleShowMoreReviews}
                  >
                    Show more reviews <i className="icon-Caret-down"></i>
                  </Typography>
                )}
              {isLoadingReviews && <Loading />}
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
              <Typography variant="body1">Is this your company?</Typography>
              <Button onClick={handleOpenModal}>Claim this profile</Button>
            </Box>
            <ClaimCompanyModal
              onSubmit={onSubmitClaimSponsor}
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
  const sponsorResponse = await getSponsor({
    id,
    reviewsLimit: 3,
    dealsLimit: 3,
  });
  if ('error' in sponsorResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      reviews: sponsorResponse.reviews,
      deals: sponsorResponse.deals,
      sponsor: sponsorResponse,
    },
  };
};

export default SponsorPage;
