import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useColumnsComponentStyles } from './Deals/styles';

interface ColumnsComponentProps {
  leftColumnContent: ReactNode;
  leftColumnHeader: ReactNode;
  rightColumnContent: ReactNode;
  rightColumnHeader: ReactNode;
  paginationComponent: ReactNode;
}

const ColumnsComponent = ({
  leftColumnContent,
  leftColumnHeader,
  rightColumnHeader,
  rightColumnContent,
  paginationComponent,
}: ColumnsComponentProps) => {
  const classes = useColumnsComponentStyles();
  return (
    <Box sx={classes.root}>
      <Box sx={classes.leftColumn}>
        <Box sx={classes.leftColumnHeader}>{leftColumnHeader}</Box>
        {leftColumnContent}
      </Box>
      <Box sx={classes.rightColumn}>
        <Box sx={classes.rightColumnHeader}>{rightColumnHeader}</Box>
        {rightColumnContent}
        <Box sx={classes.paggination}>{paginationComponent}</Box>
      </Box>
    </Box>
  );
};

export default ColumnsComponent;
