import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useReviewDetailsModalStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_DEAL_IMAGE, DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import CustomRating from '@/components/common/CustomRating';

interface ReviewDetailsModal extends Omit<ModalProps, 'children'> {
  title: string;
  review: ReviewInterface;
}

const reviewWithCommentKeys = [
  'preInvestmentCommunication',
  'postInvestmentCommunication',
  'strengthOfLeadershipTeam',
  'alignmentOfExpectations',
];

const ReviewDetailsModal = ({
  title,
  onClose,
  review,
  ...props
}: ReviewDetailsModal) => {
  const classes = useReviewDetailsModalStyles();

  const handleClose = (e: MouseEvent | object) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <Modal showCloseIcon={false} {...props}>
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Box>
              <Typography variant="body1">{title}</Typography>
              <Typography variant="caption" sx={classes.subTitle}>
                {review?.sponsor?.sponsorName}
              </Typography>
            </Box>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.contentWrapper}>
          <Box sx={classes.content}>
            <Box sx={classes.reviewInfo}>
              <Typography variant="h3" sx={classes.title}>
                “{review?.overallComment}”
              </Typography>
              <Box sx={classes.mainReviewInfo}>
                <Box sx={classes.mainReviewInfoRow}>
                  <Typography
                    sx={classes.mainReviewInfoLabel}
                    variant="caption"
                  >
                    Reviewer
                  </Typography>
                  <Typography variant="body1">{`${review?.reviewer?.firstName} ${review?.reviewer?.lastName}`}</Typography>
                </Box>
                <Box sx={classes.mainReviewInfoRow}>
                  <Typography
                    sx={classes.mainReviewInfoLabel}
                    variant="caption"
                  >
                    Sponsor
                  </Typography>
                  <Box sx={classes.entityInfo}>
                    <PlaceholderImage
                      width={32}
                      height={32}
                      src={review?.sponsor?.businessAvatar as string}
                      defaultImage={DEFAULT_SPONSOR_IMAGE}
                      alt="sponsor image"
                    />
                    <Box>
                      <Typography variant="body1">
                        {review?.sponsor?.sponsorName}
                      </Typography>
                      <Typography variant="caption">
                        {review?.sponsor?.address}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={classes.mainReviewInfoRow}>
                  <Typography
                    sx={classes.mainReviewInfoLabel}
                    variant="caption"
                  >
                    Deal
                  </Typography>
                  {!!review?.deal ? (
                    <Box sx={classes.entityInfo}>
                      <PlaceholderImage
                        width={32}
                        height={32}
                        src={review?.deal?.attachments?.[0]?.path as string}
                        defaultImage={DEFAULT_DEAL_IMAGE}
                        alt="deal image"
                      />
                      <Box>
                        <Typography variant="body1">
                          {review?.deal?.dealTitle}
                        </Typography>
                        <Typography variant="caption">
                          {review?.deal?.dealAddress}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body1">N/A</Typography>
                  )}
                </Box>
                <Box sx={classes.mainReviewInfoRow}>
                  <Typography
                    sx={classes.mainReviewInfoLabel}
                    variant="caption"
                  >
                    Rating
                  </Typography>
                  <Box sx={classes.rating}>
                    <CustomRating
                      value={review?.overallRating}
                      readOnly
                      fontSize="16px"
                    />
                    <Typography variant="body1">
                      {review?.overallRating}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={classes.proofsBlock}>
                <Typography variant="h5" sx={classes.blockTitle}>
                  Proofs
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={classes.blockTitle}>
                  Review details
                </Typography>
                {reviewWithCommentKeys.map(key => (
                  <Box key={key}>
                    <CustomRating
                      value={Number(
                        review?.[(key + 'Rating') as keyof ReviewInterface]
                      )}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewDetailsModal;
