import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useDeleteReviewModalStyles } from './styles';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { deleteReview } from '@/actions/reviews';

interface DeleteReviewModalProps extends Omit<ModalProps, 'children' | 'id'> {
  onSubmitClose: () => void;
  id: number;
}

const DeleteReviewModal = ({
  onSubmitClose,
  id,
  ...props
}: DeleteReviewModalProps) => {
  const classes = useDeleteReviewModalStyles();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteReview({ id });
    if (!('error' in response)) {
      onSubmitClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal showCloseIcon={false} {...props}>
      <Box sx={classes.root}>
        <Typography variant="h3" fontWeight={600}>
          Delete review?
        </Typography>
        <Typography variant="body1" sx={classes.subTitle}>
          This action can not be undone.
        </Typography>
        <Box sx={classes.buttonsWrapper}>
          <Button
            variant="secondary"
            onClick={e => props.onClose && props.onClose(e, 'backdropClick')}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={isLoading} color="error">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteReviewModal;
