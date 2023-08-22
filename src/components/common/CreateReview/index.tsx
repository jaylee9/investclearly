import { Box, Modal, ModalProps, Typography } from '@mui/material';
import { useCreateReviewFormStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { useState } from 'react';
import StepsComponent from '../StepsComponent';
import ChooseSponsorStep from './ChooseSponsor';
import { CreateReviewPayloadInterface } from '@/actions/reviews';

interface CreateReviewFormProps extends Omit<ModalProps, 'children'> {}

const steps = [
  'Choose Sponsor',
  'Choose Deal',
  'Review Details',
  'Upload Proof',
];

const CreateReviewForm = ({ ...props }: CreateReviewFormProps) => {
  const { onClose, ...other } = props;
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<CreateReviewPayloadInterface>({
    sponsorId: undefined,
  });
  const classes = useCreateReviewFormStyles();
  return (
    <Modal closeAfterTransition {...other}>
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Typography variant="body1">Write a Review</Typography>
          </Box>
          <i
            className="icon-Cross"
            onClick={e => onClose && onClose(e, 'backdropClick')}
          />
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
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateReviewForm;
