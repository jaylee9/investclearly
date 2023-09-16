import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import { useLoadingStyles } from './styles';
import type { FC } from 'react';

interface LoadingProps {
  sxCustomStyles?: SxProps<Theme>;
}

const Loading: FC<LoadingProps> = ({ sxCustomStyles }) => {
  const classes = useLoadingStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      sx={sxCustomStyles}
    >
      <CircularProgress sx={classes.root} size={48} />
    </Box>
  );
};

export default Loading;
