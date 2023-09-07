import {
  GetAllDealsResponse,
  addDealToBookmark,
  deleteDealFromBookmarks,
  getAllDeals,
} from '@/actions/deals';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Loading from '@/components/common/Loading';
import CustomPagination from '@/components/common/Pagination';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import {
  type IFilters,
  DealsFilters,
  DealsFiltersHeader,
} from './DealsFilters';
import BannerBlock from '@/components/page/Home/BannerBlock';
import { Box, Modal, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import { useDealsComponentStyles } from './styles';
import ColumnsComponent from '../ColumnsComponent';
import filterDifferences from '@/helpers/filterDifferences';
import { Regions } from '@/backend/constants/enums/regions';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import Button from '@/components/common/Button';

const sortOptions = [
  { label: 'Newest Deals', value: 'DESC' },
  { label: 'Oldest Deals', value: 'ASC' },
];

interface DealsComponentProps {
  dealsResponse: GetAllDealsResponse;
  searchValue: string;
  setDealsCount: (value: number) => void;
}

type FilterArrayKeys =
  | 'ratings'
  | 'asset_classes'
  | 'statuses'
  | 'regions'
  | 'investment_structure'
  | 'exemptions';

type FilterLabelKeys =
  | 'actualIRR'
  | 'fees'
  | 'preffered_return'
  | 'min_investment'
  | 'targetIRR';

const filtersLabels: Record<FilterLabelKeys, string> = {
  actualIRR: 'Actual IRR, %',
  targetIRR: 'Target IRR, %',
  fees: 'Fees, %',
  preffered_return: 'Preffered return, %',
  min_investment: 'Min investment, USD',
};

interface AppliedFilter {
  label: string;
  key: FilterLabelKeys | FilterArrayKeys;
  type: 'array' | 'range';
}

const DealsComponent = ({
  dealsResponse,
  searchValue,
  setDealsCount,
}: DealsComponentProps) => {
  const classes = useDealsComponentStyles();
  const router = useRouter();
  const { isMobile, isDesktop } = useBreakpoints();
  const [isDealsFilterMobile, setIsDealsFilterMobile] = useState(false);
  const [dealsData, setDealsData] = useState(dealsResponse);
  const [orderDirection, setOrderDirection] = useState<'DESC' | 'ASC'>('DESC');
  const handleChangeSelect = (e: SelectChangeEvent<unknown>) => {
    setOrderDirection(e.target.value as 'DESC' | 'ASC');
    setPage(1);
  };
  useEffect(() => {
    setDealsCount(dealsData.total);
  }, [dealsData, setDealsCount]);
  const defaultFilters = {
    ratings: [],
    asset_classes: [],
    statuses: [],
    regions: [],
    regulations: [],
    investment_structure: [],
    exemptions: [],
    targetIRR: {
      from: dealsResponse.rangeData.minTargetIRR,
      to: dealsResponse.rangeData.maxTargetIRR,
    },
    actualIRR: {
      from: dealsResponse.rangeData.minActualIRR,
      to: dealsResponse.rangeData.maxActualIRR,
    },
    fees: {
      from: dealsResponse.rangeData.minFee,
      to: dealsResponse.rangeData.maxFee,
    },
    min_investment: {
      from: dealsResponse.rangeData.minInvestment,
      to: dealsResponse.rangeData.maxInvestment,
    },
    preffered_return: {
      from: dealsResponse.rangeData.minPreferredReturn,
      to: dealsResponse.rangeData.maxPreferredReturn,
    },
  };
  const assetClassesArray = Object.values(AssetClasses);
  const regionsArray = Object.values(Regions);
  const asset_classes = assetClassesArray.filter(
    item =>
      item.replace(/[\s']/g, '_').toLowerCase() === router.query.asset_class
  );
  const regions = regionsArray.filter(
    item => item.replace(/[\s']/g, '_').toLowerCase() === router.query.regions
  );
  const formattedFilters = { ...defaultFilters, asset_classes, regions };
  defaultFilters;
  const [filters, setFilters] = useState<IFilters>(formattedFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<IFilters>(formattedFilters);
  const [page, setPage] = useState(1);

  const dirtyFilters = filterDifferences(filters, appliedFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;

  const changedFilters = filterDifferences(filters, defaultFilters);
  const isChangedFilters = !!Object.values(changedFilters).length;

  const changedFiltersAfterApply = filterDifferences(
    appliedFilters,
    defaultFilters
  );

  const payload = Object.entries(changedFiltersAfterApply).length
    ? {
        page,
        pageSize: 10,
        orderDirection,
        search: searchValue,
        ...changedFiltersAfterApply,
      }
    : {
        page,
        pageSize: 10,
        orderDirection,
        search: searchValue,
        ...dirtyFilters,
      };

  const { isLoading, refetch } = useQuery(
    ['deals', page, orderDirection, searchValue],
    () => getAllDeals(payload),
    {
      onSuccess: data => {
        if (!('error' in data)) {
          setDealsData(data);
        }
      },
      keepPreviousData: true,
    }
  );

  const handleApplyFilters = () => {
    setPage(1);
    setAppliedFilters(filters);
    refetch();
    closeDealsFilterMobileHandler();
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

  const formatFilters = (filters: IFilters) => {
    const formattedFilters: AppliedFilter[] = [];
    const arrayFilters: string[] = [];
    const rangeFilters: string[] = [];

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const filterKey = key as keyof IFilters;
        const value = filters[filterKey];

        if (Array.isArray(value)) {
          arrayFilters.push(key);
        } else if (
          value &&
          typeof value === 'object' &&
          'from' in value &&
          'to' in value
        ) {
          rangeFilters.push(key);
        }
      }
    }

    arrayFilters.forEach(key => {
      const filterKey = key as keyof IFilters;
      const filterValues = filters[filterKey] as string[];

      filterValues.forEach(value => {
        formattedFilters.push({
          label: key === 'ratings' ? `${value} stars` : value,
          key: key as FilterArrayKeys,
          type: 'array',
        });
      });
    });

    rangeFilters.forEach(key => {
      const filterKey = key as FilterLabelKeys;
      const value = filters[filterKey];
      if (value) {
        formattedFilters.push({
          label: `${filtersLabels[filterKey]}: ${value.from}-${value.to}`,
          key: key as FilterLabelKeys,
          type: 'range',
        });
      }
    });

    return formattedFilters;
  };

  const handleFilterRemove = (
    value: string,
    key: FilterArrayKeys | FilterLabelKeys,
    type: 'array' | 'range'
  ) => {
    if (type === 'array') {
      const arrayKey = key as FilterArrayKeys;
      setAppliedFilters(prevAppliedFilters => ({
        ...prevAppliedFilters,
        [arrayKey]: (prevAppliedFilters[arrayKey] as string[]).filter(item =>
          arrayKey === 'ratings'
            ? Number(item) !== Number(value.replace(' stars', ''))
            : item !== value
        ),
      }));
      setFilters(prevFilters => ({
        ...prevFilters,
        [arrayKey]: (prevFilters[arrayKey] as string[]).filter(item =>
          arrayKey === 'ratings'
            ? Number(item) !== Number(value.replace(' stars', ''))
            : item !== value
        ),
      }));
    } else if (type === 'range') {
      const rangeKey = key as FilterLabelKeys;
      setAppliedFilters({
        ...appliedFilters,
        [rangeKey]: defaultFilters[rangeKey],
      });
      setFilters({ ...filters, [rangeKey]: defaultFilters[rangeKey] });
    }
  };
  const formattedAppliedFilters = formatFilters(changedFiltersAfterApply);

  const handleChangePaginate = (page: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPage(page);
  };

  const closeDealsFilterMobileHandler = () => {
    setIsDealsFilterMobile(false);
  };

  const handleAddBookmark = async (entityId: number) => {
    setDealsData(prevDeals => {
      const formattedDeals = prevDeals.deals.map(deal => {
        if (deal.id === entityId) {
          return { ...deal, isInBookmarks: true };
        }
        return deal;
      });
      return { ...prevDeals, deals: formattedDeals };
    });
    const response = await addDealToBookmark({ entityId });
    if ('error' in response) {
      setDealsData(prevDeals => {
        const formattedDeals = prevDeals.deals.map(deal => {
          if (deal.id === entityId) {
            return { ...deal, isInBookmarks: false };
          }
          return deal;
        });
        return { ...prevDeals, deals: formattedDeals };
      });
    }
  };

  const handleDeleteBookmark = async (entityId: number) => {
    setDealsData(prevDeals => {
      const formattedDeals = prevDeals.deals.map(deal => {
        if (deal.id === entityId) {
          return { ...deal, isInBookmarks: false };
        }
        return deal;
      });
      return { ...prevDeals, deals: formattedDeals };
    });
    const response = await deleteDealFromBookmarks({ entityId });
    if ('error' in response) {
      setDealsData(prevDeals => {
        const formattedDeals = prevDeals.deals.map(deal => {
          if (deal.id === entityId) {
            return { ...deal, isInBookmarks: true };
          }
          return deal;
        });
        return { ...prevDeals, deals: formattedDeals };
      });
    }
  };
  return (
    <>
      <ColumnsComponent
        count={dealsData.total}
        leftColumnHeader={
          isDesktop && (
            <DealsFiltersHeader
              isChangedFilters={isChangedFilters}
              handleClearFilters={handleClearFilters}
            />
          )
        }
        leftColumnContent={
          isDesktop && (
            <DealsFilters
              setFilters={setFilters}
              filters={filters}
              handleApplyFilters={handleApplyFilters}
              disabledApplyFilters={!isDirtyFilters}
              rangeData={dealsResponse.rangeData}
            />
          )
        }
        rightColumnHeaderTitle={
          <Box sx={classes.filterMobileHeaderWrapper}>
            {isDesktop ? (
              <Typography variant="body1">
                <span style={{ fontWeight: 600 }}>{dealsData.total} Deals</span>{' '}
                found {!!searchValue && `for ${searchValue}`}
              </Typography>
            ) : (
              <Button
                variant="secondary"
                sxCustomStyles={classes.filterButton}
                onClick={() => setIsDealsFilterMobile(!isDealsFilterMobile)}
              >
                <i className="icon-Filter"></i>
                Filters{' '}
                {formattedAppliedFilters.length
                  ? `+${formattedAppliedFilters.length}`
                  : ''}
              </Button>
            )}
            <Modal
              open={isDealsFilterMobile}
              onClose={closeDealsFilterMobileHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={classes.mobileFilterWrapper}>
                <DealsFiltersHeader onClose={closeDealsFilterMobileHandler} />
                <DealsFilters
                  setFilters={setFilters}
                  filters={filters}
                  handleApplyFilters={handleApplyFilters}
                  disabledApplyFilters={!isDirtyFilters}
                  isChangedFilters={isChangedFilters}
                  handleClearFilters={handleClearFilters}
                  rangeData={dealsResponse.rangeData}
                />
              </Box>
            </Modal>
            <Box sx={classes.selectWrapper}>
              <Typography variant="body1" noWrap>
                Sort by:
              </Typography>
              <Box sx={classes.selectContent}>
                <CustomSelect
                  options={sortOptions}
                  variant={SelectVariant.Dark}
                  onChange={handleChangeSelect}
                  value={orderDirection}
                />
              </Box>
            </Box>
          </Box>
        }
        rightColumnHeaderContent={
          isDesktop && (
            <>
              {formattedAppliedFilters.map((filter, index) => (
                <Box sx={classes.appliedFilter} key={index}>
                  <Typography variant="caption">{filter.label}</Typography>
                  <span
                    className="icon-Cross"
                    onClick={() =>
                      handleFilterRemove(filter.label, filter.key, filter.type)
                    }
                  />
                </Box>
              ))}
            </>
          )
        }
        rightColumnContent={
          isLoading ? (
            <Loading sxCustomStyles={{ marginBottom: '16px' }} />
          ) : (
            <Box sx={classes.dealsWrapper}>
              {dealsData.deals.map(deal => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  variant={DealCardVariant.Large}
                  isBookmarked={deal.isInBookmarks}
                  addBookmark={handleAddBookmark}
                  deleteBookmark={handleDeleteBookmark}
                />
              ))}
            </Box>
          )
        }
        paginationComponent={
          <>
            {!isMobile && (
              <Typography variant="caption">
                Showing {firstItem}-{lastItem} of {dealsData.total} results
              </Typography>
            )}
            <CustomPagination
              count={dealsData.lastPage}
              page={page}
              onChange={(event, value) => handleChangePaginate(value)}
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
