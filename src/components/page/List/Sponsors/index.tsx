import { Box, Modal, Typography } from '@mui/material';
import ColumnsComponent from '../ColumnsComponent';
import {
  type ISponsorFilters,
  SponsorsFilters,
  SponsorsFiltersHeader,
} from './SponsorsFilters';
import { useEffect, useState, useCallback } from 'react';
import { useSponsorComponentStyles } from './styles';
import filterDifferences from '@/helpers/filterDifferences';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import {
  GetAllSponsorsResponse,
  addSponsorToBookmark,
  deleteSponsorFromBookmarks,
  getAllSponsors,
} from '@/actions/sponsors';
import { useQuery } from 'react-query';
import Loading from '@/components/common/Loading';
import SponsorCard, {
  SponsorCardVariant,
} from '@/components/common/SponsorCard';
import CustomPagination from '@/components/common/Pagination';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import Button from '@/components/common/Button';

const sortOptions = [
  { label: 'Newest Sponsors', value: 'DESC' },
  { label: 'Oldest Sponsors', value: 'ASC' },
];

interface SponsorsComponentProps {
  sponsorsResponse: GetAllSponsorsResponse;
  searchValue: string;
  setSponsorsCount: (value: number) => void;
}

type FilterArrayKeys = 'ratings' | 'primaryAssetClasses' | 'regionalFocus';
type FilterCheckedKeys = 'activelyRising';
const filtersLabels = {
  activelyRising: 'Actively rising sponsors',
};
interface AppliedFilter {
  label: string;
  key: FilterCheckedKeys | FilterArrayKeys;
  type: 'array' | 'check';
}

const SponsorsComponent = ({
  sponsorsResponse,
  searchValue,
  setSponsorsCount,
}: SponsorsComponentProps) => {
  const classes = useSponsorComponentStyles();
  const { isMobile, isDesktop } = useBreakpoints();
  const defaultFilters = {
    ratings: [],
    primaryAssetClasses: [],
    regionalFocus: [],
    activelyRising: false,
  };
  const [sponsorsData, setSponsorsData] = useState(sponsorsResponse);
  const [isSponsorsFilterMobile, setIsSponsorsFilterMobile] = useState(false);
  const [filters, setFilters] = useState<ISponsorFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<ISponsorFilters>(defaultFilters);
  const [orderDirection, setOrderDirection] = useState<'DESC' | 'ASC'>('DESC');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSponsorsCount(sponsorsData.total);
  }, [sponsorsData, setSponsorsCount]);

  const dirtyFilters = filterDifferences(filters, appliedFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;

  const changedFilters = filterDifferences(filters, defaultFilters);
  const isChangedFilters = !!Object.values(changedFilters).length;
  const handleChangeSelect = (value: 'DESC' | 'ASC') => {
    setPage(1);
    setOrderDirection(value);
  };
  const changedFiltersAfterApply = filterDifferences(
    appliedFilters,
    defaultFilters
  );
  const formatFilters = (filters: ISponsorFilters) => {
    const formattedFilters: AppliedFilter[] = [];
    const arrayFilters: string[] = [];
    const checkedFilters: string[] = [];

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const filterKey = key as keyof ISponsorFilters;
        const value = filters[filterKey];

        if (Array.isArray(value)) {
          arrayFilters.push(key);
        } else {
          checkedFilters.push(key);
        }
      }
    }

    arrayFilters.forEach(key => {
      const filterKey = key as keyof ISponsorFilters;
      const filterValues = filters[filterKey] as string[];

      filterValues.forEach(value => {
        formattedFilters.push({
          label: key === 'ratings' ? `${value} stars` : value,
          key: key as FilterArrayKeys,
          type: 'array',
        });
      });
    });

    checkedFilters.forEach(key => {
      const filterKey = key as FilterCheckedKeys;
      const value = filters[filterKey];
      if (value) {
        formattedFilters.push({
          label: filtersLabels[filterKey],
          key: key as FilterCheckedKeys,
          type: 'check',
        });
      }
    });

    return formattedFilters;
  };
  const handleFilterRemove = (
    value: string,
    key: FilterArrayKeys | FilterCheckedKeys,
    type: 'array' | 'check'
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
    } else if (type === 'check') {
      const checkedKey = key as FilterCheckedKeys;
      setAppliedFilters({
        ...appliedFilters,
        [checkedKey]: defaultFilters[checkedKey],
      });
      setFilters({ ...filters, [checkedKey]: defaultFilters[checkedKey] });
    }
  };
  const formattedAppliedFilters = formatFilters(changedFiltersAfterApply);

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
  const { isLoading, refetch } = useQuery<GetAllSponsorsResponse>(
    ['sponsors', page, orderDirection, searchValue],
    () => getAllSponsors(payload) as Promise<GetAllSponsorsResponse>,
    {
      onSuccess: data => {
        setSponsorsData(data);
      },
      keepPreviousData: true,
    }
  );
  const handleApplyFilters = () => {
    setPage(1);
    setAppliedFilters(filters);
    refetch();
    closeSponsorsFilterMobileHandler();
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  useEffect(() => {
    refetch();
  }, [appliedFilters, refetch]);

  const firstItem = (page - 1) * 10 + 1;
  const lastItem =
    page * 10 > sponsorsData.total ? sponsorsData.total : page * 10;

  const handleChangePaginate = (page: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPage(page);
  };

  const closeSponsorsFilterMobileHandler = () => {
    setIsSponsorsFilterMobile(false);

    const handleAddBookmark = useCallback(async (entityId: number) => {
      setSponsorsData(prevSponsors => {
        const formattedSponsors = prevSponsors.sponsors.map(sponsor => {
          if (sponsor.id === entityId) {
            return { ...sponsor, isInBookmarks: true };
          }
          return sponsor;
        });
        return { ...prevSponsors, sponsors: formattedSponsors };
      });
      const response = await addSponsorToBookmark({ entityId });
      if ('error' in response) {
        setSponsorsData(prevSponsors => {
          const formattedSponsors = prevSponsors.sponsors.map(sponsor => {
            if (sponsor.id === entityId) {
              return { ...sponsor, isInBookmarks: false };
            }
            return sponsor;
          });
          return { ...prevSponsors, deals: formattedSponsors };
        });
      }
    }, []);

    const handleDeleteBookmark = useCallback(async (entityId: number) => {
      setSponsorsData(prevSponsors => {
        const formattedSponsors = prevSponsors.sponsors.map(sponsor => {
          if (sponsor.id === entityId) {
            return { ...sponsor, isInBookmarks: false };
          }
          return sponsor;
        });
        return { ...prevSponsors, sponsors: formattedSponsors };
      });
      const response = await deleteSponsorFromBookmarks({ entityId });
      if ('error' in response) {
        setSponsorsData(prevSponsors => {
          const formattedSponsors = prevSponsors.sponsors.map(sponsor => {
            if (sponsor.id === entityId) {
              return { ...sponsor, isInBookmarks: true };
            }
            return sponsor;
          });
          return { ...prevSponsors, deals: formattedSponsors };
        });
      }
    }, []);

    return (
      <ColumnsComponent
        count={sponsorsData.total}
        leftColumnHeader={
          isDesktop && (
            <SponsorsFiltersHeader
              isChangedFilters={isChangedFilters}
              handleClearFilters={handleClearFilters}
              setFilters={setFilters}
              filters={filters}
            />
          )
        }
        leftColumnContent={
          isDesktop && (
            <SponsorsFilters
              filters={filters}
              setFilters={setFilters}
              handleApplyFilters={handleApplyFilters}
              disabledApplyFilters={!isDirtyFilters}
            />
          )
        }
        rightColumnHeaderTitle={
          <Box sx={classes.filterMobileHeaderWrapper}>
            {isDesktop ? (
              <Typography variant="body1">
                <span style={{ fontWeight: 600 }}>
                  {sponsorsData.total} Sponsors
                </span>{' '}
                found {!!searchValue && `for ${searchValue}`}
              </Typography>
            ) : (
              <Button
                variant="secondary"
                sxCustomStyles={classes.filterButton}
                onClick={() =>
                  setIsSponsorsFilterMobile(!isSponsorsFilterMobile)
                }
              >
                <i className="icon-Filter"></i>
                Filters{' '}
                {formattedAppliedFilters.length
                  ? `+${formattedAppliedFilters.length}`
                  : ''}
              </Button>
            )}
            <Modal
              open={isSponsorsFilterMobile}
              onClose={closeSponsorsFilterMobileHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={classes.mobileFilterWrapper}>
                <SponsorsFiltersHeader
                  isChangedFilters={isChangedFilters}
                  handleClearFilters={handleClearFilters}
                  setFilters={setFilters}
                  filters={filters}
                  onClose={closeSponsorsFilterMobileHandler}
                />
                <SponsorsFilters
                  setFilters={setFilters}
                  filters={filters}
                  handleApplyFilters={handleApplyFilters}
                  disabledApplyFilters={!isDirtyFilters}
                  isChangedFilters={isChangedFilters}
                  handleClearFilters={handleClearFilters}
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
                  onChange={e =>
                    handleChangeSelect(e.target.value as 'DESC' | 'ASC')
                  }
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
            <Box sx={classes.sponsorsWrapper}>
              {sponsorsData.sponsors.map(sponsor => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  variant={SponsorCardVariant.Large}
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
                Showing {firstItem}-{lastItem} of {sponsorsData.total} results
              </Typography>
            )}
            <CustomPagination
              count={sponsorsData.lastPage}
              page={page}
              onChange={(event, value) => handleChangePaginate(value)}
            />
          </>
        }
      />
    );
  };
};

export default SponsorsComponent;
