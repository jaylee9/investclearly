import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import { GetAllSponsorsResponse, getAllSponsors } from '@/actions/sponsors';
import CustomTabs from '@/components/common/CustomTabs';
import Layout from '@/components/common/Layout';
import DealsComponent from '@/components/page/List/Deals';
import SponsorsComponent from '@/components/page/List/Sponsors';
import theme from '@/config/theme';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import useHeaderProps from '@/hooks/useHeaderProps';
import { useListStyles } from '@/pages_styles/listStyles';
import { Box } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

interface ListPageProps {
  dealsResponse: GetAllDealsResponse;
  sponsorsResponse: GetAllSponsorsResponse;
}

const List = ({ dealsResponse, sponsorsResponse }: ListPageProps) => {
  const router = useRouter();
  const classes = useListStyles();
  const { isDesktop } = useBreakpoints();
  const [searchValue, setSearchValue] = useState(
    (router.query.search as string) || ''
  );
  const [dealsCount, setDealsCount] = useState(dealsResponse.total);
  const [sponsorsCount, setSponsorsCount] = useState(sponsorsResponse.total);
  const handleChangeSearch = (value: string) => {
    setSearchValue(value);
  };
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isShadow: false,
    onChangeSearch: handleChangeSearch,
    isDealAssetClasses: false,
  });
  const tabs = [
    {
      value: 'sponsors',
      label: 'Sponsors',
      count: sponsorsCount,
      content: (
        <SponsorsComponent
          sponsorsResponse={sponsorsResponse}
          searchValue={searchValue}
          setSponsorsCount={setSponsorsCount}
        />
      ),
    },
    {
      value: 'deals',
      label: 'Deals',
      count: dealsCount,
      content: (
        <DealsComponent
          dealsResponse={dealsResponse}
          searchValue={searchValue}
          setDealsCount={setDealsCount}
        />
      ),
    },
  ];
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    router.push({
      pathname: router.pathname,
      query: { type: newValue },
    });
  };
  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <CustomTabs
          tabs={tabs}
          onChange={handleChange}
          value={router.query.type as string}
          customStyles={{
            background: theme.palette.common.white,
            padding: isDesktop ? '0px 48px' : '0px 16px',
          }}
        />
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const {
    query: { search },
  } = context;
  const dealsResponse = await getAllDeals({
    page: 1,
    pageSize: 10,
    search: (search as string) || '',
  });
  const sponsorsResponse = await getAllSponsors({
    page: 1,
    pageSize: 10,
    search: (search as string) || '',
  });
  if ('error' in dealsResponse || 'error' in sponsorsResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      dealsResponse,
      sponsorsResponse,
    },
  };
};

export default List;
