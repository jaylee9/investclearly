import { Box, Modal, ModalProps, Typography } from '@mui/material';
import { useCreateReviewFormStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { useState } from 'react';
import StepsComponent from '../StepsComponent';
import ChooseSponsorStep from './ChooseSponsor';
import { CreateReviewPayloadInterface } from '@/actions/reviews';
import ChooseDealStep from './ChooseDeal';
import ReviewDetailsStep from './ReviewDetails';
import UploadProofStep from './UploadProof';
import ReviewSubmitted from './ReviewSubmitted';

interface CreateReviewFormProps extends Omit<ModalProps, 'children'> {}

const steps = {
  'Choose Sponsor': 0,
  'Choose Deal': 1,
  'Review Details': 2,
  'Upload Proof': 3,
  'Review Submitted': 4,
};

const CreateReviewForm = ({ ...props }: CreateReviewFormProps) => {
  const { onClose, ...other } = props;
  const [step, setStep] = useState(steps['Choose Sponsor']);
  const [payload, setPayload] = useState<CreateReviewPayloadInterface>({});

  const classes = useCreateReviewFormStyles();

  const handleClose = (e: MouseEvent | object) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
    setStep(steps['Choose Sponsor']);
    setPayload({});
  };

  const stepsArray = Object.keys(steps).filter(
    item => item !== 'Review Submitted'
  );

  const isStepsShown = step !== steps['Review Submitted'];
  const isSubtitleShown = step > 1;
  const isMobileButtonBackShown = step !== 0 && step !== 4;

  return (
    <Modal
      onClose={e => {
        handleClose(e);
      }}
      {...other}
    >
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.logoBox}>
            <Logo />
          </Box>

          <Box sx={classes.buttonBack}>
            {isMobileButtonBackShown && (
              <i
                className="icon-Arrow-left"
                onClick={() => {
                  setStep(step - 1);
                }}
                style={classes.iconBack}
              />
            )}
          </Box>

          <Box sx={classes.titleBox}>
            <Typography variant="body1" fontWeight={600}>
              Write a Review
            </Typography>
            {isSubtitleShown && (
              <Typography variant="body1" sx={classes.subTitle}>
                Cloud Investment Ltd
              </Typography>
            )}
          </Box>

          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>

        <Box sx={classes.content}>
          {isStepsShown && (
            <StepsComponent steps={stepsArray} currentStep={step} />
          )}
          {step === steps['Choose Sponsor'] && (
            <ChooseSponsorStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
          {step === steps['Choose Deal'] && (
            <ChooseDealStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
          {step === steps['Review Details'] && (
            <ReviewDetailsStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
          {step === steps['Upload Proof'] && (
            <UploadProofStep
              step={step}
              setStep={setStep}
              payload={payload}
              setPayload={setPayload}
            />
          )}
          {step === steps['Review Submitted'] && (
            <ReviewSubmitted handleClose={handleClose} setStep={setStep} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateReviewForm;
