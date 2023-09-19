import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useAddEditSponsorModalStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { useState } from 'react';
import StepsComponent from '@/components/common/StepsComponent';
import SponsorDetailsForm from './SponsorDetailsForm';

export interface AddEditSponsorModalProps
  extends Omit<ModalProps, 'children'> {}

const steps = {
  'Sponsor Details': 0,
  'Financial Metrics': 1,
};

const AddEditSponsorModal = ({
  onClose,
  ...props
}: AddEditSponsorModalProps) => {
  const classes = useAddEditSponsorModalStyles();

  const [step, setStep] = useState(steps['Sponsor Details']);

  const handleClose = (e: MouseEvent | object) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <Modal showCloseIcon={false} onClose={handleClose} {...props}>
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Typography variant="body1">List Sponsor</Typography>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.contentWrapper}>
          <StepsComponent steps={Object.keys(steps)} currentStep={step} />
          <Box sx={classes.content}>
            <Typography variant="h4" sx={classes.title}>
              {Object.keys(steps)[step]}
            </Typography>
            {step === steps['Sponsor Details'] && <SponsorDetailsForm />}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditSponsorModal;
