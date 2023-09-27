import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useDeleteDealModalStyles } from './styles';
import Button from '@/components/common/Button';
import { deleteInvestment } from '@/actions/investments';
import { useState } from 'react';

interface DeleteDealModalProps extends Omit<ModalProps, 'children' | 'id'> {
  onSubmitClose: () => void;
  id: number;
}

const DeleteDealModal = ({
  onSubmitClose,
  id,
  ...props
}: DeleteDealModalProps) => {
  const classes = useDeleteDealModalStyles();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteInvestment({ id });
    if (!('error' in response)) {
      onSubmitClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal showCloseIcon={false} {...props}>
      <Box sx={classes.root}>
        <Box sx={classes.textBox}>
          <Typography variant="h3" sx={classes.title}>
            Delete deal from your profile?
          </Typography>
          <Typography variant="body1" sx={classes.subTitle}>
            This action can not be undone.
          </Typography>
        </Box>
        <Box sx={classes.buttonsWrapper}>
          <Button
            variant="secondary"
            onClick={e => props.onClose && props.onClose(e, 'backdropClick')}
            sxCustomStyles={classes.button}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={handleDelete}
            disabled={isLoading}
            sxCustomStyles={classes.button}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteDealModal;
