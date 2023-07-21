import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Layout from '@/components/common/Layout';
import Loading from '@/components/common/Loading';
import CustomPagination from '@/components/common/Pagination';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import DealsFilters from '@/components/page/Deals/DealsFilters';
import BannerBlock from '@/components/page/Home/BannerBlock';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealsPageStyles from '@/pages_styles/dealsStyles';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Investment', value: 'investment' },
];

interface DealsPageProps {
  dealsResponse: GetAllDealsResponse;
}

const Deals = ({ dealsResponse }: DealsPageProps) => {
  const classes = useDealsPageStyles();
  const [dealsData, setDealsData] = useState(dealsResponse);
  const [page, setPage] = useState(1);
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  const { isLoading } = useQuery(
    ['deals', page],
    () => getAllDeals({ page, pageSize: 10 }),
    {
      onSuccess: data => {
        setDealsData(data);
      },
    }
  );

  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.leftColumn}>
          <DealsFilters />
        </Box>
        <Box sx={classes.rightColumn}>
          <Box sx={classes.rightColumnHeader}>
            <Typography variant="body1">
              <span style={{ fontWeight: 600 }}>{dealsData.total} Deals</span>{' '}
              found for Invest
            </Typography>
            <Box sx={classes.selectWrapper}>
              <Typography variant="body1">Sort by:</Typography>
              <Box sx={classes.selectContent}>
                <CustomSelect
                  options={sortOptions}
                  placeholder="Search"
                  variant={SelectVariant.Dark}
                />
              </Box>
            </Box>
          </Box>
          {isLoading ? (
            <Loading />
          ) : (
            <Box sx={classes.dealsWrapper}>
              {dealsData.deals.map(deal => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  variant={DealCardVariant.Large}
                />
              ))}
            </Box>
          )}
          <Box sx={classes.paggination}>
            <Typography variant="caption">
              Showing {page}-
              {page >= dealsData.lastPage ? dealsData.total : page * 10} of{' '}
              {dealsData.total} results
            </Typography>
            <CustomPagination
              count={dealsData.lastPage}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
        </Box>
      </Box>
      <BannerBlock
        title="Can’t find a deal? Let us know!"
        buttonLabel="Contact Us"
        buttonHref="/contact"
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
