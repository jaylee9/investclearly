import { Box } from '@mui/material';
import ColumnsComponent from '../ColumnsComponent';

const SponsorsComponent = () => {
  return (
    <ColumnsComponent
      leftColumnHeader="Filter"
      leftColumnContent={<Box>Here will be filters</Box>}
      rightColumnHeader={<Box>Here will be heafer</Box>}
      rightColumnContent={<Box>Here will be list</Box>}
      paginationComponent={<Box>Pagination</Box>}
    />
  );
};

export default SponsorsComponent;
