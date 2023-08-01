import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Loading from '@/components/common/Loading';
import CustomPagination from '@/components/common/Pagination';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import DealsFilters, { IFilters } from './DealsFilters';
import BannerBlock from '@/components/page/Home/BannerBlock';
import { Box, Fade, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import { useDealsComponentStyles } from './styles';
import ColumnsComponent from '../ColumnsComponent';
import filterDifferences from '@/helpers/filterDifferences';

const sortOptions = [
  { label: 'Newest Deals', value: 'DESC' },
  { label: 'Oldest Deals', value: 'ASC' },
];

interface DealsComponentProps {
  dealsResponse: GetAllDealsResponse;
}

const DealsComponent = ({ dealsResponse }: DealsComponentProps) => {
  const classes = useDealsComponentStyles();
  const router = useRouter();
  const [dealsData, setDealsData] = useState(dealsResponse);
  const [orderDirection, setOrderDirection] = useState<'DESC' | 'ASC'>('DESC');
  const handleChangeSelect = (e: SelectChangeEvent<unknown>) => {
    setOrderDirection(e.target.value as 'DESC' | 'ASC');
  };
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
  const [appliedFilters, setAppliedFilters] =
    useState<IFilters>(formattedFilters);

  const [page, setPage] = useState(1);

  const dirtyFilters = filterDifferences(filters, appliedFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;

  const changedFilters = filterDifferences(filters, defaultFilters);
  const isChangedFilters = !!Object.values(changedFilters).length;

  const { isLoading, refetch } = useQuery(
    ['deals', page, orderDirection],
    () =>
      getAllDeals({
        page,
        pageSize: 10,
        orderDirection,
        search: (router.query.search as string) || '',
        ...dirtyFilters,
      }),
    {
      onSuccess: data => {
        setDealsData(data);
      },
      keepPreviousData: true,
    }
  );

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    refetch();
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  useEffect(() => {
    refetch();
  }, [appliedFilters, refetch]);

  const firstItem = (page - 1) * 10 + 1;
  const lastItem = page * 10 > dealsData.total ? dealsData.total : page * 10;

  return (
    <>
      <ColumnsComponent
        leftColumnHeader={
          <>
            <Typography variant="h5">Filters</Typography>
            {isChangedFilters && (
              <Fade in={isChangedFilters}>
                <Typography variant="body1" onClick={handleClearFilters}>
                  Clear filters
                </Typography>
              </Fade>
            )}
          </>
        }
        leftColumnContent={
          <DealsFilters
            setFilters={setFilters}
            filters={filters}
            handleApplyFilters={handleApplyFilters}
            disabledApplyFilters={!isDirtyFilters}
          />
        }
        rightColumnHeader={
          <>
            <Typography variant="body1">
              <span style={{ fontWeight: 600 }}>{dealsData.total} Deals</span>{' '}
              found for Invest
            </Typography>
            <Box sx={classes.selectWrapper}>
              <Typography variant="body1">Sort by:</Typography>
              <Box sx={classes.selectContent}>
                <CustomSelect
                  options={sortOptions}
                  variant={SelectVariant.Dark}
                  onChange={handleChangeSelect}
                  value={orderDirection}
                />
              </Box>
            </Box>
          </>
        }
        rightColumnContent={
          isLoading ? (
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
          )
        }
        paginationComponent={
          <>
            <Typography variant="caption">
              Showing {firstItem}-{lastItem} of {dealsData.total} results
            </Typography>
            <CustomPagination
              count={dealsData.lastPage}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </>
        }
      />
      <BannerBlock
        title="Can’t find a deal? Let us know!"
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
};

export default DealsComponent;
