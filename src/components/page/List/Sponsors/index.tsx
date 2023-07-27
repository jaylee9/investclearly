import { Box, Fade, Typography } from '@mui/material';
import ColumnsComponent from '../ColumnsComponent';
import SponsorsFilters, { ISponsorFilters } from './SponsorsFilters';
import { useState } from 'react';
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
}

const SponsorsComponent = ({ sponsorsResponse }: SponsorsComponentProps) => {
  const classes = useSponsorComponentStyles();
  const defaultFilters = {
    ratings: [],
    primaryAssetClasses: [],
    regionalFocus: [],
    activelyRaising: false,
  };
  const [sponsorsData, setSponsorsData] = useState(sponsorsResponse);
  const [filters, setFilters] = useState<ISponsorFilters>(defaultFilters);
  const [orderDirection, setOrderDirection] = useState<'DESC' | 'ASC'>('DESC');
  const [page, setPage] = useState(1);
  const dirtyFilters = filterDifferences(filters, defaultFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;
  const handleChangeSelect = (value: 'DESC' | 'ASC') => {
    setOrderDirection(value);
  };
  const { isLoading, refetch } = useQuery(
    ['sponsors', page, orderDirection],
    () =>
      getAllSponsors({ page, pageSize: 10, orderDirection, ...dirtyFilters }),
    {
      onSuccess: data => {
        setSponsorsData(data);
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
  const firstItem = (page - 1) * 10 + 1;
  const lastItem =
    page * 10 > sponsorsData.total ? sponsorsData.total : page * 10;
  return (
    <ColumnsComponent
      leftColumnHeader={
        <Box sx={classes.filtersHeaderWrapper}>
          <Box sx={classes.filtersHeaderTitleWrapper}>
            <Typography variant="h5">Filters</Typography>
            {isDirtyFilters && (
              <Fade in={isDirtyFilters}>
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
        />
      }
      rightColumnHeader={
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
