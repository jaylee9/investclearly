import { getAllDeals } from '@/actions/deals';
import { getUser } from '@/actions/user';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import Layout from '@/components/common/Layout';
import UserAvatar from '@/components/common/UserAvatar';
import useHeaderProps from '@/hooks/useHeaderProps';
import usePublicUserPageStyles from '@/pages_styles/publicUserPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

interface PublicUserPageProps {
  user: PublicUserInterface;
  reviews: ReviewInterface[];
  deals: DealInterface[];
}

const PublicUserPage = ({ user, reviews, deals }: PublicUserPageProps) => {
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isFixed: true,
  });
  const classes = usePublicUserPageStyles();

  const [reviewsData] = useState(reviews);
  const [dealsData] = useState(deals);
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
          <Box sx={classes.rightColumnBlock}></Box>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id as string;
  const userResponse = await getUser({ id });
  //mock request that will be replaced by user deals
  const deals = await getAllDeals({ page: 1, pageSize: 3 });
  if (!userResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: userResponse,
      reviews: userResponse.reviews,
      deals,
    },
  };
};

export default PublicUserPage;
