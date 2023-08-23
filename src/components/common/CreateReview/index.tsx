import { Box, Modal, ModalProps, Typography } from '@mui/material';
import { useCreateReviewFormStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { useState } from 'react';
import StepsComponent from '../StepsComponent';
import ChooseSponsorStep from './ChooseSponsor';
import { CreateReviewPayloadInterface } from '@/actions/reviews';
import ChooseDealStep from './ChooseDeal';
import ReviewDetailsStep from './ReviewDetails';

interface CreateReviewFormProps extends Omit<ModalProps, 'children'> {}

const steps = [
  'Choose Sponsor',
  'Choose Deal',
  'Review Details',
  'Upload Proof',
];

const CreateReviewForm = ({ ...props }: CreateReviewFormProps) => {
  const { onClose, ...other } = props;
  const [step, setStep] = useState(2);
  const [payload, setPayload] = useState<CreateReviewPayloadInterface>({});

  const classes = useCreateReviewFormStyles();

  const handleClose = (e: MouseEvent | object) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
    setStep(0);
    setPayload({});
  };
  return (
    <Modal
      onClose={e => {
        handleClose(e);
      }}
      {...other}
    >
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Typography variant="body1">Write a Review</Typography>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.content}>
          <StepsComponent steps={steps} currentStep={step} />
          {step === 0 && (
            <ChooseSponsorStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
          {step === 1 && (
            <ChooseDealStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
          {step === 2 && (
            <ReviewDetailsStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateReviewForm;
