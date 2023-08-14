import { Box, Dialog, DialogProps, DialogTitle } from '@mui/material';
import { useModalStyles } from './styles';

interface ModalProps extends DialogProps {
  handleClose: () => void;
}

const Modal = ({ handleClose, ...props }: ModalProps) => {
  const classes = useModalStyles();
  return (
    <Dialog sx={classes.root} {...props}>
      <DialogTitle>
        <Box sx={classes.iconWrapper} onClick={handleClose}>
          <span className="icon-Cross"></span>
        </Box>
      </DialogTitle>
      {props.children}
    </Dialog>
  );
};

export default Modal;
