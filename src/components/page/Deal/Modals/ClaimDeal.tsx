import Modal from '@/components/common/Modal';
import { Box, Fade, ModalProps, Typography } from '@mui/material';
import { useClaimDealModalStyles } from './styles';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { z } from 'zod';
import CustomTextArea from '@/components/common/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { STEP1, STEP2 } from '@/config/constants';

const validationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required field')
    .email('Email must be a valid'),
  businessPhone: z.string().min(1, 'Business phone is required field'),
  jobTitle: z.string().min(1, 'Job title is required field'),
  message: z.string().min(1, 'Message is required field'),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface AddDealModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  onSubmit: (data: ValidationSchema) => void;
  handleClose: () => void;
}

const ClaimDealModal = ({
  onSubmit,
  handleClose,
  ...props
}: AddDealModalProps) => {
  const classes = useClaimDealModalStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });

  const [step, setStep] = useState(1);

  const onFormSubmit = handleSubmit(data => {
    onSubmit(data);
    reset();
    setStep(2);
  });

  const onClose = () => {
    handleClose();
    reset();
    setStep(1);
  };

  return (
    <Modal onClose={onClose} {...props}>
      <Box sx={classes.root}>
        {step === STEP1 && (
          <>
            <Typography variant="h3">Claim deal</Typography>
            <form onSubmit={onFormSubmit}>
              <Box sx={classes.formWrapper}>
                <Input
                  placeholder="Your Business Email"
                  showClearOption={false}
                  register={register('email')}
                  errorText={errors.email?.message}
                />
                <Input
                  placeholder="Your Business Phone"
                  showClearOption={false}
                  register={register('businessPhone')}
                  errorText={errors.businessPhone?.message}
                />
                <Input
                  placeholder="Job Title"
                  showClearOption={false}
                  register={register('jobTitle')}
                  errorText={errors.jobTitle?.message}
                />
                <CustomTextArea
                  height="120px"
                  placeholder="Message"
                  register={register('message')}
                  errorText={errors.message?.message}
                />
              </Box>
              <Button type="submit" customStyles={classes.submitButton}>
                Send claim request
              </Button>
            </form>
          </>
        )}
        <Fade in={step === STEP2}>
          <Box sx={classes.secondStepWrapper}>
            {step === STEP2 && (
              <>
                <Typography variant="h3">Request sent</Typography>
                <Typography variant="body1" sx={classes.subTitle}>
                  We’ve received your request and will let you know about our
                  decision.
                </Typography>
                <Button customStyles={{ width: '100%' }} onClick={onClose}>
                  Got it
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Box>
    </Modal>
  );
};

export default ClaimDealModal;
