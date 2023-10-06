import { useHeadBlockStyles } from './styles';
import { Box, Typography } from '@mui/material';
import GlobalSearch from './GlobalSearch/GlobalSearch';
import { GlobalSearchResponse } from '@/actions/common';
import { useState } from 'react';

interface HeadBlockProps {
  searchResponse: GlobalSearchResponse;
}

const HeadBlock = ({ searchResponse }: HeadBlockProps) => {
  const [isOpenGlobalSearch, setIsOpenGlobalSearch] = useState(false);
  const classes = useHeadBlockStyles();
  return (
    <Box sx={classes.root}>
      <Box sx={classes.titleWrapper}>
        <Typography variant="h1" sx={classes.title}>
          Invest Clearly. Invest Confidently.
        </Typography>
        <Typography sx={classes.subTitle} variant="body1">
          The #1 Platform for Vetting Real Estate Syndications & Funds. Verified
          Reviews from Investors Like You
        </Typography>
      </Box>
      <GlobalSearch
        searchResponse={searchResponse}
        type="light"
        isOpenGlobalSearch={isOpenGlobalSearch}
        setIsOpenGlobalSearch={setIsOpenGlobalSearch}
      />
    </Box>
  );
};

export default HeadBlock;
