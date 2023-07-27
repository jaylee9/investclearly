import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import DealsComponent from '@/components/page/List/Deals';
import SponsorsComponent from '@/components/page/List/Sponsors';
import theme from '@/config/theme';
import useHeaderProps from '@/hooks/useHeaderProps';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';

interface ListPageProps {
  dealsResponse: GetAllDealsResponse;
}

const Deals = ({ dealsResponse }: ListPageProps) => {
  const router = useRouter();
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  const tabs = [
    {
      value: 'deals',
      label: 'Deals',
      count: dealsResponse.total,
      content: <DealsComponent dealsResponse={dealsResponse} />,
    },
    {
      value: 'sponsors',
      label: 'Sponsors',
      count: dealsResponse.total,
      content: <SponsorsComponent />,
    },
  ];
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type: newValue },
    });
  };
  return (
    <Layout {...headerProps}>
      <CustomTabs
        tabs={tabs}
        onChange={handleChange}
        value={router.query.type as string}
        customStyles={{
          background: theme.palette.common.white,
          padding: '0px 48px',
        }}
      />
    </Layout>
  );
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
