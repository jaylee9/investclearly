import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import DealsComponent from '@/components/page/List/Deals';
import { useRouter } from 'next/router';

interface ListPageProps {
  dealsResponse: GetAllDealsResponse;
}

const Deals = ({ dealsResponse }: ListPageProps) => {
  const router = useRouter();
  return <DealsComponent dealsResponse={dealsResponse} />;
};

export const getServerSideProps = async () => {
  const dealsResponse = await getAllDeals({ page: 1, pageSize: 10 });
  if (!dealsResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      dealsResponse,
    },
  };
};

export default Deals;
