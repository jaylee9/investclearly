import { useState } from 'react';
import Logo from '@/assets/components/Logo';
import Modal from '@/components/common/Modal';
import StepsComponent from '@/components/common/StepsComponent';
import { Box, ModalProps, Typography } from '@mui/material';
import { useEditDealModalStyles } from './styles';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import GeneralInfoForm from './GeneralInfoForm';
import FinancialMetricsForm from './FinancialMetricsForm';

interface EditDealModal extends Omit<ModalProps, 'children'> {
  deal: DealInterface;
  refetch: () => void;
}

const steps = {
  'General Info': 0,
  'Financial Metrics': 1,
};

const EditDealModal = ({ onClose, deal, refetch, ...props }: EditDealModal) => {
  const classes = useEditDealModalStyles();

  const [step, setStep] = useState(steps['General Info']);

  const handleClose = (e: MouseEvent | object) => {
    setStep(steps['General Info']);
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <Modal onClose={handleClose} showCloseIcon={false} {...props}>
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Box>
              <Typography variant="body1">Edit Deal</Typography>
              {deal?.vanityName && (
                <Typography variant="caption">{deal.vanityName}</Typography>
              )}
            </Box>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.contentWrapper}>
          <StepsComponent
            steps={Object.keys(steps)}
            currentStep={step}
            isEditable={true}
            setStep={setStep}
          />
          <Box sx={classes.content}>
            <Typography variant="h4" sx={classes.title}>
              {Object.keys(steps)[step]}
            </Typography>
            {step === steps['General Info'] && (
              <GeneralInfoForm
                deal={deal}
                refetch={refetch}
                onClose={handleClose}
              />
            )}
            {step === steps['Financial Metrics'] && (
              <FinancialMetricsForm
                deal={deal}
                refetch={refetch}
                onClose={handleClose}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditDealModal;
