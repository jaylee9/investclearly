import { Box, Typography } from '@mui/material';
import { useWriteReviewBlockStyles } from './styles';
import Button from '@/components/common/Button';

const WriteReviewBlock = () => {
  const classes = useWriteReviewBlockStyles();
  return (
    <Box sx={classes.root}>
      <Typography variant="h2">
        Investing In a Real Estate Syndication or Fund?
        <br /> Share Your Experience With Other Investors
      </Typography>
      <Button variant="white">Write a review</Button>
    </Box>
  );
};

export default WriteReviewBlock;
