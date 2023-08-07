import { Box, Fade, Typography } from '@mui/material';
import ColumnsComponent from '../ColumnsComponent';
import SponsorsFilters, { ISponsorFilters } from './SponsorsFilters';
import { useEffect, useState } from 'react';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { useSponsorComponentStyles } from './styles';
import filterDifferences from '@/helpers/filterDifferences';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { GetAllSponsorsResponse, getAllSponsors } from '@/actions/sponsors';
import { useQuery } from 'react-query';
import Loading from '@/components/common/Loading';
import SponsorCard, {
  SponsorCardVariant,
} from '@/components/common/SponsorCard';
import CustomPagination from '@/components/common/Pagination';

const sortOptions = [
  { label: 'Newest Sponsors', value: 'DESC' },
  { label: 'Oldest Sponsors', value: 'ASC' },
];

interface SponsorsComponentProps {
  sponsorsResponse: GetAllSponsorsResponse;
  searchValue: string;
}

type FilterArrayKeys = 'ratings' | 'primaryAssetClasses' | 'regionalFocus';
type FilterCheckedKeys = 'activelyRaising';
const filtersLabels = {
  activelyRaising: 'Actively raising sponsors',
};
interface AppliedFilter {
  label: string;
  key: FilterCheckedKeys | FilterArrayKeys;
  type: 'array' | 'check';
}

const SponsorsComponent = ({
  sponsorsResponse,
  searchValue,
}: SponsorsComponentProps) => {
  const classes = useSponsorComponentStyles();
  const defaultFilters = {
    ratings: [],
    primaryAssetClasses: [],
    regionalFocus: [],
    activelyRaising: false,
  };
  const [sponsorsData, setSponsorsData] = useState(sponsorsResponse);
  const [filters, setFilters] = useState<ISponsorFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<ISponsorFilters>(defaultFilters);
  const [orderDirection, setOrderDirection] = useState<'DESC' | 'ASC'>('DESC');
  const [page, setPage] = useState(1);
  const dirtyFilters = filterDifferences(filters, appliedFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;

  const changedFilters = filterDifferences(filters, defaultFilters);
  const isChangedFilters = !!Object.values(changedFilters).length;
  const handleChangeSelect = (value: 'DESC' | 'ASC') => {
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
  const { isLoading, refetch } = useQuery(
    ['sponsors', page, orderDirection, searchValue],
    () =>
      getAllSponsors({
        page,
        pageSize: 10,
        orderDirection,
        search: searchValue,
        ...dirtyFilters,
      }),
    {
      onSuccess: data => {
        setSponsorsData(data);
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
  const lastItem =
    page * 10 > sponsorsData.total ? sponsorsData.total : page * 10;
  return (
    <ColumnsComponent
      count={sponsorsData.total}
      leftColumnHeader={
        <Box sx={classes.filtersHeaderWrapper}>
          <Box sx={classes.filtersHeaderTitleWrapper}>
            <Typography variant="h5">Filters</Typography>
            {isChangedFilters && (
              <Fade in={isChangedFilters}>
                <Typography variant="body1" onClick={handleClearFilters}>
                  Clear filters
                </Typography>
              </Fade>
            )}
          </Box>
          <Box>
            <CustomCheckbox
              onChange={e =>
                setFilters({ ...filters, activelyRaising: e.target.checked })
              }
              checked={filters.activelyRaising}
              label="Actively rising"
            />
          </Box>
        </Box>
      }
      leftColumnContent={
        <SponsorsFilters
          filters={filters}
          setFilters={setFilters}
          handleApplyFilters={handleApplyFilters}
          disabledApplyFilters={!isDirtyFilters}
        />
      }
      rightColumnHeaderTitle={
        <>
          <Typography variant="body1">
            <span style={{ fontWeight: 600 }}>
              {sponsorsData.total} Sponsors
            </span>{' '}
            found for Invest
          </Typography>
          <Box sx={classes.selectWrapper}>
            <Typography variant="body1">Sort by:</Typography>
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
        </>
      }
      rightColumnHeaderContent={
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
      }
      rightColumnContent={
        isLoading ? (
          <Loading />
        ) : (
          <Box sx={classes.sponsorsWrapper}>
            {sponsorsData.sponsors.map(sponsor => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                variant={SponsorCardVariant.Large}
              />
            ))}
          </Box>
        )
      }
      paginationComponent={
        <>
          <Typography variant="caption">
            Showing {firstItem}-{lastItem} of {sponsorsData.total} results
          </Typography>
          <CustomPagination
            count={sponsorsData.lastPage}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </>
      }
    />
  );
};

export default SponsorsComponent;
