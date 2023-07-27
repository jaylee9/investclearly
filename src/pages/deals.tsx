import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Layout from '@/components/common/Layout';
import Loading from '@/components/common/Loading';
import CustomPagination from '@/components/common/Pagination';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import DealsFilters, { IFilters } from '@/components/page/Deals/DealsFilters';
import BannerBlock from '@/components/page/Home/BannerBlock';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealsPageStyles from '@/pages_styles/dealsStyles';
import { Box, Fade, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { differenceWith, isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';

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
  const router = useRouter();
  const defaultFilters = {
    ratings: [],
    asset_classes: [],
    statuses: [],
    regions: [],
    investment_structure: [],
    exemptions: [],
    targetIRR: {
      from: 2,
      to: 12,
    },
    actualIRR: {
      from: 2,
      to: 12,
    },
    fees: {
      from: 2,
      to: 12,
    },
    min_investment: {
      from: 5000,
      to: 25000,
    },
    prefferd_return: {
      from: 5000,
      to: 25000,
    },
  };
  const assetClassesArray = Object.values(AssetClasses);
  const asset_classes = assetClassesArray.filter(
    item =>
      item.replace(/[\s']/g, '_').toLowerCase() === router.query.asset_class
  );
  const formattedFilters = router.query.asset_class
    ? { ...defaultFilters, asset_classes }
    : defaultFilters;
  const [filters, setFilters] = useState<IFilters>(formattedFilters);
  const [page, setPage] = useState(1);
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });

  const filterDifferences = (filters: IFilters) => {
    const differences = differenceWith(
      Object.entries(filters),
      Object.entries(defaultFilters),
      ([filterKey, filterValue], [defaultFilterKey, defaultFilterValue]) =>
        filterKey === defaultFilterKey &&
        isEqual(filterValue, defaultFilterValue)
    );

    return Object.fromEntries(differences);
  };

  const dirtyFilters = filterDifferences(filters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;

  const { isLoading, refetch } = useQuery(
    ['deals', page],
    () => getAllDeals({ page, pageSize: 10, ...dirtyFilters }),
    {
      onSuccess: data => {
        setDealsData(data);
      },
      keepPreviousData: true,
    }
  );

  const handleApplyFilters = () => {
    refetch();
  };
  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };
  useEffect(() => {
    if (!isDirtyFilters) {
      refetch();
    }
  }, [filters, isDirtyFilters, refetch]);

  const firstItem = (page - 1) * 10 + 1;
  const lastItem = page * 10 > dealsData.total ? dealsData.total : page * 10;

  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.leftColumn}>
          <Box sx={classes.leftColumnHeader}>
            <Typography variant="h5">Filters</Typography>
            {isDirtyFilters && (
              <Fade in={isDirtyFilters}>
                <Typography variant="body1" onClick={handleClearFilters}>
                  Clear filters
                </Typography>
              </Fade>
            )}
          </Box>
          <DealsFilters
            setFilters={setFilters}
            filters={filters}
            handleApplyFilters={handleApplyFilters}
          />
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
              Showing {firstItem}-{lastItem} of {dealsData.total} results
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
