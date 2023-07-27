import { Box, Fade, Typography } from '@mui/material';
import ColumnsComponent from '../ColumnsComponent';
import SponsorsFilters, { ISponsorFilters } from './SponsorsFilters';
import { useState } from 'react';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { useSponsorComponentStyles } from './styles';
import filterDifferences from '@/helpers/filterDifferences';

const SponsorsComponent = () => {
  const classes = useSponsorComponentStyles();
  const defaultFilters = {
    ratings: [],
    primaryAssetClasses: [],
    regionalFocus: [],
    activelyRaising: false,
  };
  const [filters, setFilters] = useState<ISponsorFilters>(defaultFilters);
  const dirtyFilters = filterDifferences(filters, defaultFilters);
  const isDirtyFilters = !!Object.values(dirtyFilters).length;
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
      rightColumnHeader={<Box>Here will be heafer</Box>}
      rightColumnContent={<Box>Here will be list</Box>}
      paginationComponent={<Box>Pagination</Box>}
    />
  );
};

export default SponsorsComponent;
