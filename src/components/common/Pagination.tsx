import { Pagination, PaginationItem, PaginationProps } from '@mui/material';
import { usePaginationStyles } from './styles';

const ArrowBackIcon = () => {
  return <i className="icon-Arrow-left"></i>;
};

const ArrowNextIcon = () => {
  return <i className="icon-Arrow-right"></i>;
};

const CustomPagination = ({ ...props }: PaginationProps) => {
  const classes = usePaginationStyles();
  return (
    <Pagination
      sx={classes.root}
      renderItem={item => (
        <PaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowNextIcon }}
          {...item}
        />
      )}
      {...props}
    />
  );
};

export default CustomPagination;
