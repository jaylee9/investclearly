import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDeactivateAccountModalStyles } from './styles';
import CustomTextArea from '@/components/common/TextArea';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import Button from '@/components/common/Button';
import { useUser } from '@/contexts/User';
import { deactivateAccount } from '@/actions/user';
import { USER_ROLE } from '@/config/constants';

const validationSchema = z.object({
  feedback: z.string(),
  isUnderstand: z.boolean(),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

const DeactivateAccountModal = ({ ...props }: Omit<ModalProps, 'children'>) => {
  const classes = useDeactivateAccountModalStyles();

  const router = useRouter();

  const { setUser } = useUser();

  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { onClose, ...rest } = props;

  const handleClose = (e: MouseEvent | object) => {
    if (isLoading) {
      return;
    } else if (isDeleted && onClose) {
      onClose(e, 'backdropClick');
      router.push('/login');
    } else if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  const { handleSubmit, register, control, watch } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const { feedback } = data;
    const response = await deactivateAccount({ feedback });
    if (!('error' in response)) {
      setIsDeleted(true);
      setUser(null);
      localStorage.removeItem(USER_ROLE);
    }
    setIsLoading(false);
  });

  return (
    <Modal onClose={handleClose} {...rest}>
      <Box sx={classes.root}>
        {isDeleted ? (
          <Box sx={classes.content}>
            <Box sx={classes.iconWrapper}>
              <i className="icon-Check" />
            </Box>
            <Typography variant="h3" sx={classes.title}>
              Your account is deactivated
            </Typography>
            <Typography sx={classes.deletedSubTitle}>
              Thank you for using Invest Clearly!
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h3" sx={classes.title}>
              Deactivate your account?
            </Typography>
            <Typography variant="body1" sx={classes.subTitle}>
              Note that account deactivation is permanent. There will be no way
              to log in or restore your account.
            </Typography>
            <form onSubmit={onSubmit}>
              <Box sx={classes.textAreaWrapper}>
                <Typography variant="caption" sx={classes.textAreaTitle}>
                  How can we improve the product?
                </Typography>
                <CustomTextArea
                  register={register('feedback')}
                  height="98px"
                  placeholder="Feedback"
                />
              </Box>
              <Controller
                control={control}
                name="isUnderstand"
                render={({ field: { onChange, value } }) => (
                  <CustomCheckbox
                    onChange={onChange}
                    checked={value}
                    label="Yes, I understand the consequences of deleting my account"
                    customStyles={{ marginBottom: '24px' }}
                  />
                )}
              />
              <Box sx={classes.buttonsWrapper}>
                <Button
                  variant="secondary"
                  disabled={isLoading}
                  onClick={e => onClose && onClose(e, 'backdropClick')}
                >
                  Keep account
                </Button>
                <Button
                  color="error"
                  disabled={isLoading || !watch('isUnderstand')}
                  type="submit"
                >
                  Yes, deactivate
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DeactivateAccountModal;
