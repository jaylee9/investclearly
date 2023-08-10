import { getDeal } from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';

interface DealPageProps {
  deal: DealInterface;
  reviews: ReviewInterface[];
}

const DealPage = ({ deal, reviews }: DealPageProps) => {
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    // onChangeSearch: handleChangeSearch,
  });
  return (
    <Layout {...headerProps}>
      <Box></Box>
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
