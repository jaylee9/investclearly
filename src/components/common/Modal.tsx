import { Box, ModalProps, DialogTitle, Modal as ModalMUI } from '@mui/material';
import { useModalStyles } from './styles';

interface CustomModalProps extends ModalProps {
  showCloseIcon?: boolean;
}

const Modal = ({ showCloseIcon = true, ...props }: CustomModalProps) => {
  const classes = useModalStyles();
  const { onClose, children, ...rest } = props;
  return (
    <ModalMUI
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...rest}
    >
      <Box sx={classes.root}>
        <DialogTitle padding="0px !important">
          {showCloseIcon && (
            <Box
              sx={classes.iconWrapper}
              onClick={e => onClose && onClose(e, 'backdropClick')}
            >
              <span className="icon-Cross"></span>
            </Box>
          )}
        </DialogTitle>
        {children}
      </Box>
    </ModalMUI>
  );
};

export default Modal;
