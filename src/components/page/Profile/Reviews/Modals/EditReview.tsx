import Logo from '@/assets/components/Logo';
import { Box, ModalProps, Modal, Typography } from '@mui/material';
import { useVerifyReviewModalStyles } from './styles';
import { useEffect, useState } from 'react';
import FileUploader, { FileItem } from '@/components/common/FileUploader';
import Button from '@/components/common/Button';
import clsx from 'clsx';
import {
  CreateReviewPayloadInterface,
  EditReviewPayloadInterface,
  editReview,
} from '@/actions/reviews';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import Loading from '@/components/common/Loading';
import { formatAllToFileItems } from '@/helpers/fileFromURL';
import ReviewDetailsStep from '@/components/common/CreateReview/ReviewDetails';
import StepsComponent from '@/components/common/StepsComponent';

const steps = {
  'Review Details': 0,
  'Reupload Proofs': 1,
  'Review Submitted': 2,
};

interface VerifyReviewModalProps extends Omit<ModalProps, 'children'> {
  review: ReviewInterface;
  refetch: () => void;
}

const EditReviewModal = ({
  review,
  refetch,
  ...props
}: VerifyReviewModalProps) => {
  const { onClose, ...other } = props;
  const classes = useVerifyReviewModalStyles();
  const [step, setStep] = useState(steps['Review Details']);
  const [files, setFiles] = useState<File[]>([]);
  const [defaultFiles, setDefaultFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUrlToFileLoading, setIsUrlToFileLoading] = useState(false);
  const [payload, setPayload] = useState(review);
  const [attachmentIdsToDelete, setAttachmentIdsToDelete] = useState<number[]>(
    []
  );

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

  const handleDefaultFileDelete = (fileId: string) => {
    const correspondingAttachment = review.attachments.find(
      att => att.id.toString() === fileId
    );
    if (correspondingAttachment) {
      setAttachmentIdsToDelete(prev => [...prev, correspondingAttachment.id]);
    }
  };

  const handleClose = async (e: MouseEvent | object) => {
    if (isLoading) {
      return;
    }
    await refetch();
    if (onClose) {
      onClose(e, 'backdropClick');
    }
    setStep(steps['Review Details']);
  };

  const handleEdit = async () => {
    setIsLoading(true);
    const formatPayload = (
      payload: ReviewInterface
    ): EditReviewPayloadInterface => {
      return {
        id: payload.id,
        title: payload.title,
        preInvestmentCommunicationRating:
          payload.preInvestmentCommunicationRating,
        preInvestmentCommunicationComment:
          payload.preInvestmentCommunicationComment as string,
        postInvestmentCommunicationRating:
          payload.postInvestmentCommunicationRating,
        postInvestmentCommunicationComment:
          payload.postInvestmentCommunicationComment as string,
        strengthOfLeadershipTeamRating: payload.strengthOfLeadershipTeamRating,
        strengthOfLeadershipTeamComment:
          payload.strengthOfLeadershipTeamComment as string,
        alignmentOfExpectationsRating: payload.alignmentOfExpectationsRating,
        alignmentOfExpectationsComment:
          payload.alignmentOfExpectationsComment as string,
        overallRating: payload.overallRating,
        overallComment: payload.overallComment,
        attachmentsIdsToDelete: attachmentIdsToDelete,
        file: files,
      };
    };
    const formattedPayload = formatPayload(payload);
    const result = await editReview(formattedPayload);
    if (result) {
      setIsLoading(false);
      setStep(steps['Review Submitted']);
    }
  };

  useEffect(() => {
    if (!!review?.attachments?.length) {
      setIsUrlToFileLoading(true);
      formatAllToFileItems(review.attachments).then(data =>
        setDefaultFiles(data)
      );
      setIsUrlToFileLoading(false);
    }
  }, [review?.attachments]);

  const contentClassName = clsx('content', {
    'stretched-content': step === steps['Reupload Proofs'],
  });

  const stepsArray = Object.keys(steps).filter(
    item => item !== 'Review Submitted'
  );

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
              <Typography variant="body1">Edit Review</Typography>
            </Box>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.contentWrapper}>
          <StepsComponent steps={stepsArray} currentStep={step} />
          {isUrlToFileLoading && <Loading />}
          {step === steps['Review Details'] && (
            <ReviewDetailsStep
              payload={review}
              setPayload={
                setPayload as (value: CreateReviewPayloadInterface) => void
              }
              step={step}
              setStep={setStep}
              isEdit
            />
          )}
          {step !== steps['Review Details'] && (
            <Box className={contentClassName}>
              {step === steps['Reupload Proofs'] && !isUrlToFileLoading && (
                <>
                  <Box>
                    <Typography variant="h4" sx={classes.title}>
                      Upload proof that you have worked with this sponsor
                    </Typography>
                    <Typography variant="body1" sx={classes.subTitle}>
                      Attach any documents or screenshots that prove your
                      involvement with {review?.sponsor?.vanityName}.
                    </Typography>
                    <FileUploader
                      onUpload={onUpload}
                      onDelete={onDelete}
                      isLoading={isLoading}
                      defaultFiles={defaultFiles}
                      onDeleteDefaultFile={handleDefaultFileDelete}
                    />
                  </Box>
                  <Box sx={classes.buttonWrapper}>
                    <Button
                      onClick={handleEdit}
                      disabled={
                        (attachmentIdsToDelete.length ===
                          review?.attachments?.length &&
                          !files.length) ||
                        isLoading
                      }
                    >
                      Resubmit Review
                    </Button>
                  </Box>
                </>
              )}
              {step === steps['Review Submitted'] && (
                <Box sx={classes.submittedReviewContent}>
                  <Typography variant="h3" sx={classes.submittedReviewTitle}>
                    Review Resubmitted!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={classes.submittedReviewSubTitle}
                  >
                    Your changes are now awaiting moderation.
                  </Typography>
                  <Button
                    onClick={handleClose}
                    customStyles={{ width: '100%', maxWidth: '480px' }}
                  >
                    To the reviews
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default EditReviewModal;
