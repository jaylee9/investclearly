import { useHeadBlockStyles } from './styles';
import { Box, Typography } from '@mui/material';
import GlobalSearch from './GlobalSearch/GlobalSearch';
import { GlobalSearchResponse } from '@/actions/common';

interface HeadBlockProps {
  searchResponse: GlobalSearchResponse;
}

const HeadBlock = ({ searchResponse }: HeadBlockProps) => {
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
      <GlobalSearch searchResponse={searchResponse} type="light" />
    </Box>
  );
};

export default HeadBlock;
