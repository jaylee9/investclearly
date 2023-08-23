import { Box, Rating, RatingProps, Typography } from '@mui/material';
import StarIcon from './StarIcon';

interface CustomRatingProps extends RatingProps {
  label?: string;
}

const CustomRating = ({ label, ...props }: CustomRatingProps) => {
  return (
    <Box>
      {label && (
        <Typography variant="body1" fontWeight={600} marginBottom="4px">
          {label}
        </Typography>
      )}
      <Rating icon={<StarIcon filled />} emptyIcon={<StarIcon />} {...props} />
    </Box>
  );
};

export default CustomRating;
