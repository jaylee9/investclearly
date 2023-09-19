import {
  Box,
  Rating,
  RatingProps,
  Typography,
  TypographyVariant,
} from '@mui/material';
import StarIcon from './StarIcon';

interface CustomRatingProps extends RatingProps {
  label?: string;
  fontSize?: string;
  required?: boolean;
  labelVariant?: TypographyVariant;
}

const CustomRating = ({
  label,
  fontSize,
  required,
  labelVariant,
  ...props
}: CustomRatingProps) => {
  return (
    <Box>
      {label && (
        <Typography
          variant={labelVariant || 'body1'}
          fontWeight={600}
          marginBottom="4px"
          display="block"
        >
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
