import { getUser } from '@/actions/user';
import { InvestmentInterface } from '@/backend/services/investments/interfaces/investment.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import DealCard from '@/components/common/DealCard';
import Layout from '@/components/common/Layout';
import Loading from '@/components/common/Loading';
import ReviewCard from '@/components/common/ReviewCard';
import UserAvatar from '@/components/common/UserAvatar';
import useHeaderProps from '@/hooks/useHeaderProps';
import usePublicUserPageStyles from '@/pages_styles/publicUserPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';

interface PublicUserPageProps {
  user: PublicUserInterface;
  reviews: ReviewInterface[];
  investments: InvestmentInterface[];
}

const PublicUserPage = ({
  user,
  reviews,
  investments,
}: PublicUserPageProps) => {
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isSticky: true,
  });
  const classes = usePublicUserPageStyles();
  const [reviewsData, setReviewsData] = useState(reviews);
  const [investmentsData, setInvestmentsData] = useState(investments);
  const [reviewsLimit, setReviewsLimit] = useState(3);
  const fetchReviews = async () => {
    const response = await getUser({
      id: String(user.id),
      reviewsLimit,
      investmentsLimit,
    });
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

  const [investmentsLimit, setInvestmentsLimit] = useState(3);
  const fetchInvestments = async () => {
    const response = await getUser({
      id: String(user.id),
      reviewsLimit,
      investmentsLimit,
    });
    return response.investments;
  };
  const { isLoading: isLoadingInvestments } = useQuery(
    ['sponsorDeals', investmentsLimit],
    fetchInvestments,
    {
      onSuccess: response => {
        setInvestmentsData(response as InvestmentInterface[]);
      },
      enabled: investmentsLimit > 3,
    }
  );
  const handleShowMoreInvestments = () =>
    setInvestmentsLimit(prevLimit => prevLimit + 3);

  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.userInfo}>
          <UserAvatar
            src={user.profilePicture}
            name={`${user.firstName} ${user.lastName}`}
            width={80}
            height={80}
          />
          <Typography variant="h3" fontWeight={600}>
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
        <Box sx={classes.rightColumn}>
          <Box sx={classes.rightColumnBlock}>
            <Box sx={classes.rightColumnBlockHeader} marginBottom="32px">
              <Typography variant="h3">Deals</Typography>
              <Typography variant="body1">{user.investmentsCount}</Typography>
            </Box>
            <Box sx={classes.dealsBlockContent}>
              {investmentsData?.map(investment => (
                <DealCard
                  key={investment.id}
                  deal={investment.deal}
                  sx={classes.dealCard}
                />
              ))}
            </Box>
            {!!user.investmentsCount &&
              user.investmentsCount > investmentsLimit &&
              !isLoadingInvestments && (
                <Typography
                  variant="body1"
                  sx={classes.showMoreLink}
                  onClick={handleShowMoreInvestments}
                >
                  Show more deals <i className="icon-Caret-down"></i>
                </Typography>
              )}
            {isLoadingInvestments && (
              <Box>
                <Loading />
              </Box>
            )}
          </Box>
          <Box sx={classes.rightColumnBlock}>
            <Box sx={classes.rightColumnBlockHeader} marginBottom="16px">
              <Typography variant="h3">Reviews</Typography>
              <Typography variant="body1">{user.reviewsCount}</Typography>
            </Box>
            <Box sx={classes.reviewsBlockContent}>
              {reviewsData?.map(review => (
                <ReviewCard
                  key={review.id}
                  review={{ ...review, reviewer: user }}
                />
              ))}
            </Box>
            {!!user.reviewsCount &&
              user.reviewsCount > reviewsLimit &&
              !isLoadingReviews && (
                <Typography
                  variant="body1"
                  sx={classes.showMoreLink}
                  onClick={handleShowMoreReviews}
                >
                  Show more reviews <i className="icon-Caret-down"></i>
                </Typography>
              )}
            {isLoadingReviews && (
              <Box>
                <Loading />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id as string;
  const userResponse = await getUser({
    id,
    reviewsLimit: 3,
    investmentsLimit: 3,
  });
  if (!userResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: userResponse,
      reviews: userResponse.reviews,
      investments: userResponse.investments,
    },
  };
};

export default PublicUserPage;
