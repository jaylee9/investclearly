import { Box, Rating, RatingProps, Typography } from '@mui/material';
import StarIcon from './StarIcon';

interface CustomRatingProps extends RatingProps {
  label?: string;
  fontSize?: string;
  required?: boolean;
}

const CustomRating = ({
  label,
  fontSize,
  required,
  ...props
}: CustomRatingProps) => {
  return (
    <Box>
      {label && (
        <Typography variant="body1" fontWeight={600} marginBottom="4px">
          {label}
          {required && <span className="required-star">*</span>}
        </Typography>
      )}
      <Rating
        icon={<StarIcon filled fontSize={fontSize} />}
        emptyIcon={<StarIcon fontSize={fontSize} />}
        {...props}
      />
    </Box>
  );
};

export default CustomRating;
