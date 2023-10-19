import { useEffect, useRef, useState } from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { useReviewCardStyles } from './styles';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import formatDate from '@/helpers/formatDate';
import StarIcon from './StarIcon';
import Link from 'next/link';
import UserAvatar from './UserAvatar';
import Button from './Button';

interface ReviewCardProps {
  review: ReviewInterface;
  isDelete?: boolean;
  onDelete?: (value: number) => void;
  showEditOption?: boolean;
  onEdit?: (review: ReviewInterface) => void;
}

const ReviewCard = ({
  review,
  isDelete = false,
  onDelete,
  showEditOption,
  onEdit,
}: ReviewCardProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const classes = useReviewCardStyles({ isExtended, isTruncated });
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExtended(prevState => !prevState);
  };

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      if (element.scrollHeight > element.clientHeight) {
        setIsTruncated(true);
      } else {
        setIsTruncated(false);
      }
    }
  }, [review]);

  const handleDelete = (value: number) => {
    if (onDelete) {
      onDelete(value);
    }
  };

  const handleEdit = (review: ReviewInterface) => {
    if (onEdit) {
      onEdit(review);
    }
  };

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
      <Typography variant="body1" sx={classes.fullComment} ref={contentRef}>
        {review.overallComment}
      </Typography>
      {isTruncated && (
        <Typography
          variant="body1"
          sx={classes.readFullLink}
          onClick={toggleExpand}
        >
          {isExtended ? 'Hide' : 'Read'} full review
        </Typography>
      )}
      {(isDelete || showEditOption) && (
        <Box sx={classes.optionalButtonWrapper}>
          {isDelete && (
            <Button
              color="error"
              variant="secondary"
              onClick={() => handleDelete(review.id)}
            >
              <i className="icon-Delete" style={classes.deleteIcon}></i>
              Delete
            </Button>
          )}
          {showEditOption && !review.isVerified && (
            <Button variant="secondary" onClick={() => handleEdit(review)}>
              Edit review
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ReviewCard;
