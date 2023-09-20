import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useAddEditSponsorModalStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { useState } from 'react';
import StepsComponent from '@/components/common/StepsComponent';
import SponsorDetailsForm from './SponsorDetailsForm';
import { PartialCreateSponsorInterface } from '@/actions/sponsors';
import FinancialMetricsForm from './FinancialMetricsForm';

export interface AddEditSponsorModalProps
  extends Omit<ModalProps, 'children' | 'onSubmit'> {
  onSubmit: (data: PartialCreateSponsorInterface) => void;
  isSuccessAdded: boolean;
  setIsSuccessAdded: (v: boolean) => void;
}

const steps = {
  'Sponsor Details': 0,
  'Financial Metrics': 1,
};

const AddEditSponsorModal = ({
  onClose,
  onSubmit,
  isSuccessAdded,
  setIsSuccessAdded,
  ...props
}: AddEditSponsorModalProps) => {
  const classes = useAddEditSponsorModalStyles();

  const [step, setStep] = useState(steps['Sponsor Details']);
  const [payload, setPayload] = useState<PartialCreateSponsorInterface>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (e: MouseEvent | object) => {
    if (isLoading) {
      return;
    }
    setStep(steps['Sponsor Details']);
    setPayload({});
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  const handleSaveDetails = (data: PartialCreateSponsorInterface) => {
    setPayload(data);
    setStep(steps['Financial Metrics']);
  };

  const handleSubmitFinancialMetrics = (
    data: PartialCreateSponsorInterface
  ) => {
    setIsLoading(true);
    onSubmit(data);
    if (isSuccessAdded) {
      setIsLoading(false);
      setStep(steps['Sponsor Details']);
      setIsSuccessAdded(false);
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
            {step === steps['Sponsor Details'] && (
              <SponsorDetailsForm
                onSave={handleSaveDetails}
                payload={payload}
              />
            )}
            {step === steps['Financial Metrics'] && (
              <FinancialMetricsForm
                setStep={setStep}
                onSave={handleSubmitFinancialMetrics}
                payload={payload}
                isLoading={isLoading}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditSponsorModal;
