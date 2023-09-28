import Logo from '@/assets/components/Logo';
import { Box, ModalProps, Modal, Typography } from '@mui/material';
import { useVerifyReviewModalStyles } from './styles';
import { useState } from 'react';
import FileUploader from '@/components/common/FileUploader';
import Button from '@/components/common/Button';
import clsx from 'clsx';
import { uploadReviewProofs } from '@/actions/reviews';

const steps = {
  'Upload Proof': 0,
  'Review Submitted': 1,
};

interface VerifyReviewModalProps extends Omit<ModalProps, 'children'> {
  refetchFunction: () => Promise<unknown>;
  reviewId: number;
  reviewerName: string;
}

const VerifyReviewModal = ({
  refetchFunction,
  reviewId,
  reviewerName,
  ...props
}: VerifyReviewModalProps) => {
  const { onClose, ...other } = props;
  const classes = useVerifyReviewModalStyles();
  const [step, setStep] = useState(steps['Upload Proof']);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = (file?: File) => {
    if (file) {
      setFiles(prevFiles => [...prevFiles, file]);
    }
  };

  const onDelete = (file?: File) => {
    if (file) {
      setFiles(prevFiles => prevFiles.filter(f => f.name !== file.name));
    }
  };

  const handleClose = (e: MouseEvent | object) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
    setStep(steps['Upload Proof']);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    const result = await uploadReviewProofs({ file: files, reviewId });
    if (result) {
      refetchFunction().then(() => {
        setIsLoading(false);
        setStep(steps['Review Submitted']);
      });
    }
  };

  const contentClassName = clsx('content', {
    'stretched-content': step === steps['Upload Proof'],
  });

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
            <Box sx={classes.titleWrapper}>
              <Typography variant="body1">Verify Review</Typography>
              <Typography variant="caption" sx={classes.reviewerName}>
                {reviewerName}
              </Typography>
            </Box>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.contentWrapper}>
          <Box className={contentClassName}>
            {step === steps['Upload Proof'] && (
              <>
                <Box>
                  <Typography variant="h4" sx={classes.title}>
                    Upload proof that you have worked with this sponsor
                  </Typography>
                  <Typography variant="body1" sx={classes.subTitle}>
                    Attach any documents or screenshots that prove your
                    involvement with Cloud Investment Ltd.
                  </Typography>
                  <FileUploader
                    onUpload={onUpload}
                    onDelete={onDelete}
                    isLoading={isLoading}
                  />
                </Box>
                <Box sx={classes.buttonWrapper}>
                  <Button
                    onClick={handleVerify}
                    disabled={!files.length || isLoading}
                  >
                    Verify review
                  </Button>
                </Box>
              </>
            )}
            {step === steps['Review Submitted'] && (
              <Box sx={classes.submittedReviewContent}>
                <Typography variant="h3" sx={classes.submittedReviewTitle}>
                  Your review has been submitted!
                </Typography>
                <Typography
                  variant="body1"
                  sx={classes.submittedReviewSubTitle}
                >
                  It will be published after moderation.
                </Typography>
                <Button onClick={handleClose} customStyles={{ width: '100%' }}>
                  To the reviews
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default VerifyReviewModal;
