import { Box, Typography } from '@mui/material';
import { useUploadProofStepStyles } from './styles';
import FileUploader from '../FileUploader';
import { useState } from 'react';
import Button from '../Button';
import { CreateReviewPayloadInterface, createReview } from '@/actions/reviews';

interface UploadProofStepProps {
  setStep: (value: number) => void;
  step: number;
  payload: CreateReviewPayloadInterface;
  setPayload: (value: CreateReviewPayloadInterface) => void;
}

const UploadProofStep = ({
  setStep,
  step,
  payload,
  setPayload,
}: UploadProofStepProps) => {
  const classes = useUploadProofStepStyles();
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

  const handleBackButton = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (type: 'withProof' | 'withoutProof') => {
    if (type === 'withoutProof') {
      setIsLoading(true);
      const result = await createReview(payload);
      if (!('error' in result)) {
        setStep(step + 1);
        setIsLoading(false);
        setPayload({});
      }
    } else if (type === 'withProof') {
      setIsLoading(true);
      const result = await createReview({ ...payload, file: files });
      if (!('error' in result)) {
        setStep(step + 1);
        setIsLoading(false);
        setPayload({});
      }
    }
  };

  return (
    <Box sx={classes.root}>
      <Box sx={classes.content}>
        <Typography variant="h4" fontWeight={600}>
          Upload proof that you have worked with this sponsor
        </Typography>
        <Typography variant="body1" sx={classes.subTitle}>
          Attach any documents or screenshots that prove your involvement with
          Cloud Investment Ltd.
        </Typography>
        <FileUploader
          onUpload={onUpload}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      </Box>
      <Box sx={classes.buttonsWrapper}>
        <Button variant="tertiary" onClick={handleBackButton}>
          Back
        </Button>
        <Box sx={classes.mainButtonsWrapper}>
          <Button
            variant="secondary"
            onClick={() => handleSubmit('withoutProof')}
          >
            Submit without proof
          </Button>
          <Button onClick={() => handleSubmit('withProof')}>
            Submit review
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadProofStep;
