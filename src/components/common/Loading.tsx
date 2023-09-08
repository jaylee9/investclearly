import { Box, CircularProgress } from '@mui/material';
import { useLoadingStyles } from './styles';

const Loading = () => {
  const classes = useLoadingStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      marginBottom="16px"
    >
      <CircularProgress sx={classes.root} size={48} />
    </Box>
  );
};

export default Loading;
