import Modal from '@/components/common/Modal';
import { Box, Fade, ModalProps, Typography } from '@mui/material';
import { useSuggestEditModalStyles } from './styles';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { z } from 'zod';
import CustomTextArea from '@/components/common/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const validationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required field')
    .email('Email must be a valid'),
  phone: z.string(),
  message: z.string().min(1, 'Message is required field'),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface AddDealModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  onSubmit: (data: ValidationSchema) => void;
  handleClose: () => void;
}

const SuggestEditModal = ({
  onSubmit,
  handleClose,
  ...props
}: AddDealModalProps) => {
  const classes = useSuggestEditModalStyles();
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

  const handleGotIt = () => {
    handleClose();
    setStep(1);
  };
  return (
    <Modal onClose={handleClose} {...props}>
      <Box sx={classes.root}>
        {step === 1 && (
          <>
            <Typography variant="h3">Claim deal</Typography>
            <Typography variant="body1" sx={classes.subTitle}></Typography>
            <form onSubmit={onFormSubmit}>
              <Box sx={classes.formWrapper}>
                <Input
                  placeholder="Email"
                  showClearOption={false}
                  register={register('email')}
                  errorText={errors.email?.message}
                />
                <Input
                  placeholder="Phone (optional)"
                  showClearOption={false}
                  register={register('phone')}
                  errorText={errors.phone?.message}
                />
                <CustomTextArea
                  height="120px"
                  placeholder="Message"
                  register={register('message')}
                  errorText={errors.message?.message}
                />
              </Box>
              <Button type="submit" customStyles={classes.submitButton}>
                Send message
              </Button>
            </form>
          </>
        )}
        <Fade in={step === 2}>
          <Box sx={classes.secondStepWrapper}>
            {step === 2 && (
              <>
                <Typography variant="h3">Message sent</Typography>
                <Typography
                  variant="body1"
                  sx={classes.subTitle}
                  textAlign="center"
                >
                  We’ll reach out as soon as possible.
                </Typography>
                <Button customStyles={{ width: '100%' }} onClick={handleGotIt}>
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

export default SuggestEditModal;
