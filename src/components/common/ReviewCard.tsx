import { Box, Rating, Typography } from '@mui/material';
import { useReviewCardStyles } from './styles';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import formatDate from '@/helpers/formatDate';
import StarIcon from './StarIcon';
import Link from 'next/link';
import UserAvatar from './UserAvatar';

interface ReviewCardProps {
  review: ReviewInterface;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const classes = useReviewCardStyles();
  return (
    <Box sx={classes.root}>
      <Box sx={classes.reviewHeader}>
        <Box sx={classes.reviewHeaderInfo}>
          <UserAvatar
            name={`${review.reviewer?.firstName} ${review.reviewer?.lastName}`}
            src={review.reviewer?.profilePicture}
            width={48}
            height={48}
          />
          <Box sx={classes.reviewHeaderMainInfo}>
            <Link href={`/users/${review.reviewer?.id}`}>
              <Typography variant="h5">
                {review.reviewer?.firstName} {review.reviewer?.lastName}
              </Typography>
            </Link>
            <Typography variant="caption">
              {formatDate(review.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            ...classes.defaultIndicatior,
            ...classes[
              review.isVerified ? 'verifiedIndicator' : 'unverifiedIndicator'
            ],
          }}
        >
          <i className={review.isVerified ? 'icon-Check' : 'icon-Cross'}></i>
          <Typography variant="body1">
            {review.isVerified ? 'Verified' : 'Unverified'} review
          </Typography>
        </Box>
      </Box>
      <Box sx={classes.ratingWrapper}>
        <Rating
          readOnly
          value={review.overallRating}
          icon={<StarIcon filled />}
          emptyIcon={<StarIcon />}
        />
        <Typography variant="body1">{review.overallRating}</Typography>
      </Box>
      <Typography variant="h4" fontWeight={600} marginBottom="16px">
        “{review.title}”
      </Typography>
      <Typography variant="body1" sx={classes.fullComment}>
        {review.overallComment}
      </Typography>
      <Link href={`/reviews/${review.id}`}>
        <Typography variant="body1" sx={classes.readFullLink}>
          Read full review
        </Typography>
      </Link>
    </Box>
  );
};

export default ReviewCard;
