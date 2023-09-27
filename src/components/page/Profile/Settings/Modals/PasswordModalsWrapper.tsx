import { Box, Modal, ModalProps, Typography } from '@mui/material';
import { usePasswordModalsWrapperStyles } from './styles';
import Logo from '@/assets/components/Logo';

interface PasswordModalsWrapperProps extends ModalProps {
  label: string;
  isLabel: boolean;
}

const PasswordModalsWrapper = ({
  label,
  isLabel,
  ...props
}: PasswordModalsWrapperProps) => {
  const { onClose, children, ...rest } = props;

  const classes = usePasswordModalsWrapperStyles();

  const handleClose = (e: MouseEvent | object) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <Modal onClose={handleClose} {...rest}>
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Typography variant="body1" sx={classes.titleWrapper}>
              {label}
            </Typography>
          </Box>
          <i className="icon-Cross" onClick={handleClose} />
        </Box>
        <Box sx={classes.content}>
          <Box sx={classes.formWrapper}>
            {isLabel && <Typography sx={classes.title}>{label}</Typography>}
            {children}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PasswordModalsWrapper;
