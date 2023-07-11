import { useHeadBlockStyles } from './styles';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import GlobalSearch from './GlobalSearch';

const HeadBlock = () => {
  const classes = useHeadBlockStyles();
  return (
    <Box sx={classes.root}>
      <Box sx={classes.titleWrapper}>
        <Typography variant="h1" sx={classes.title}>
          Invest Clearly. Invest Confidently.
        </Typography>
        <Typography sx={classes.subTitle} variant="body1">
          Real Estate syndications and funds in one place, paired with sponsor
          reviews from investors like you, so that you can invest with
          confidence.
        </Typography>
      </Box>
      <GlobalSearch />
    </Box>
  );
};

export default HeadBlock;
