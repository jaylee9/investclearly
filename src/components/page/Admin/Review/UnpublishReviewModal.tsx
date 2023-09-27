import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useUnpublishReviewModalStyles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import { unpublishReview } from '@/actions/reviews';
import { useState } from 'react';
import { useRouter } from 'next/router';

const validationSchema = z.object({
  reason: z.string(),
  unpublishReviewMessage: z
    .string()
    .min(1, 'Unpublish review message is required'),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface UnpublishReviewModalProps
  extends Omit<ModalProps, 'children' | 'onSubmit'> {
  onSubmitClose: () => void;
  reviewId: number;
}

const reasonOptions = [
  { label: 'Content Guidelines', value: 'Content Guidelines' },
  { label: 'Insufficient Verification', value: 'Insufficient Verification' },
];

const UnpublishReviewModal = ({
  onSubmitClose,
  onClose,
  reviewId,
  ...props
}: UnpublishReviewModalProps) => {
  const classes = useUnpublishReviewModalStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClose = (e: MouseEvent | object) => {
    if (isLoading) {
      return;
    } else if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      reason: 'Content Guidelines',
    },
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const { reason, unpublishReviewMessage } = data;
    const response = await unpublishReview({
      reason,
      unpublishReviewMessage,
      id: reviewId,
      router,
    });

    if (!('error' in response)) {
      onSubmitClose();
    }
    setIsLoading(false);
  });

  return (
    <Modal onClose={handleClose} {...props}>
      <Box>
        <Typography variant="h3" sx={classes.title}>
          Reject Review
        </Typography>
        <Typography variant="body1" sx={classes.subTitle}>
          Define the reason for rejection. Reviewer will get an email with the
          explanation.
        </Typography>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name="reason"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                options={reasonOptions}
                variant={SelectVariant.Dark}
                onChange={onChange}
                value={value || 'Content Guidelines'}
                topLabel="State"
                customStyles={{ marginBottom: '12px' }}
              />
            )}
          />
          <CustomTextArea
            placeholder="Message"
            height="120px"
            register={register('unpublishReviewMessage')}
            error={!!errors.unpublishReviewMessage?.message}
            errorText={errors.unpublishReviewMessage?.message}
          />
          <Box sx={classes.buttonsWrapper}>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button color="error" type="submit" disabled={isLoading}>
              Reject
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UnpublishReviewModal;
