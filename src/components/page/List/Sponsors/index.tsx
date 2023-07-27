import { Box, Fade, Typography } from '@mui/material';
import ColumnsComponent from '../ColumnsComponent';
import SponsorsFilters, { ISponsorFilters } from './SponsorsFilters';
import { useState } from 'react';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { useSponsorComponentStyles } from './styles';
import filterDifferences from '@/helpers/filterDifferences';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { GetAllSponsorsResponse } from '@/actions/sponsors';

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
  const dirtyFilters = filterDifferences(filters, defaultFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;
  const handleChangeSelect = (value: 'DESC' | 'ASC') => {
    setOrderDirection(value);
  };
  const handleApplyFilters = () => {
    console.log('apply');
  };
  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };
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
      rightColumnContent={<Box>Here will be list</Box>}
      paginationComponent={<Box>Pagination</Box>}
    />
  );
};

export default SponsorsComponent;
