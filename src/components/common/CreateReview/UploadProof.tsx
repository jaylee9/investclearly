import { Box, Typography } from '@mui/material';
import { useUploadProofStepStyles } from './styles';
import FileUploader from '../FileUploader';
import { useState } from 'react';

const UploadProofStep = () => {
  const classes = useUploadProofStepStyles();
  const [files, setFiles] = useState<File[]>([]);
  const onUpload = (file: File) => {
    setFiles(prevFiles => [...prevFiles, file]);
  };

  const onDelete = (file: File) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== file.name));
  };

  return (
    <Box sx={classes.root}>
      <Typography variant="h4" fontWeight={600}>
        Upload proof that you have worked with this sponsor
      </Typography>
      <Typography variant="body1" sx={classes.subTitle}>
        Attach any documents or screenshots that prove your involvement with
        Cloud Investment Ltd.
      </Typography>
      <FileUploader onUpload={onUpload} onDelete={onDelete} />
    </Box>
  );
};

export default UploadProofStep;
