import { Box } from '@mui/material';
import { getCloseIconStyles } from './styles';

const ToastCloseIcon = () => {
  const classes = getCloseIconStyles();
  return (
    <Box sx={classes.root}>
      <i className="icon-Cross" />
    </Box>
  );
};

export default ToastCloseIcon;
