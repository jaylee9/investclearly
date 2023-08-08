import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useColumnsComponentStyles } from './Deals/styles';

interface ColumnsComponentProps {
  leftColumnContent: ReactNode;
  leftColumnHeader: ReactNode;
  rightColumnContent: ReactNode;
  rightColumnHeaderTitle: ReactNode;
  rightColumnHeaderContent: ReactNode;
  paginationComponent: ReactNode;
  count: number;
}

const ColumnsComponent = ({
  leftColumnContent,
  leftColumnHeader,
  rightColumnHeaderTitle,
  rightColumnHeaderContent,
  rightColumnContent,
  paginationComponent,
  count,
}: ColumnsComponentProps) => {
  const classes = useColumnsComponentStyles();
  return (
    <Box sx={classes.root}>
      <Box sx={classes.leftColumn}>
        <Box sx={classes.leftColumnHeader}>{leftColumnHeader}</Box>
        {leftColumnContent}
      </Box>
      <Box sx={classes.rightColumn}>
        <Box sx={classes.rightColumnHeader}>
          <Box sx={classes.rightColumnHeaderTitle}>
            {rightColumnHeaderTitle}
          </Box>
          <Box sx={classes.rightColumnHeaderContent}>
            {rightColumnHeaderContent}
          </Box>
        </Box>
        {rightColumnContent}
        {!!count && <Box sx={classes.paggination}> {paginationComponent}</Box>}
      </Box>
    </Box>
  );
};

export default ColumnsComponent;
