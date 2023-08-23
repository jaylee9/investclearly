import { Box, LinearProgress, Typography } from '@mui/material';
import { useFileUploaderStyles } from './styles';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

interface FileItem {
  file: File;
  progress: number;
  status: 'loading' | 'loaded' | 'error' | 'aborted';
  error: DOMException | null;
  reader: FileReader;
}

const FileUploader = () => {
  const classes = useFileUploaderStyles();

  const [files, setFiles] = useState<FileItem[]>([]);
  const maxSize = 10 * 1024 * 1024;
  const handleFiles = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      const fileItem: FileItem = {
        file,
        progress: 0,
        status: 'loading',
        error: null,
        reader,
      };
      reader.onprogress = event => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFiles(prevFiles =>
            prevFiles.map(f => (f.file === file ? { ...f, progress } : f))
          );
        }
      };
      reader.onloadend = () => {
        setFiles(prevFiles =>
          prevFiles.map(f => (f.file === file ? { ...f, status: 'loaded' } : f))
        );
      };
      reader.onerror = () => {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.file === file ? { ...f, status: 'error', error: reader.error } : f
          )
        );
      };
      reader.readAsDataURL(file);
      setFiles(prevFiles => [...prevFiles, fileItem]);
    });
  };
  const { getRootProps, getInputProps } = useDropzone({
    maxSize,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'application/pdf': ['.pdf'],
    },
    onDrop: handleFiles,
  });
  //   const cancelUpload = (file: File) => {
  //     const targetFile = files.find(f => f.file === file);
  //     if (targetFile) {
  //       targetFile.reader.abort();
  //       setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
  //     }
  //   };

  //   const retryUpload = (file: File) => {
  //     setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
  //     handleFiles([file]);
  //   };

  console.log(files);
  return (
    <Box sx={classes.root}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box sx={classes.dropZone}>
          <i className="icon-Upload"></i>
          <Box sx={classes.dropZoneContent}>
            <Typography variant="body1" fontWeight={600} marginBottom="4px">
              Drag and drop or Click to upload files
            </Typography>
            <Typography variant="caption" sx={classes.infoText}>
              Max 3 files, 10 MB each. Accepted formats: *.jpg, *.jpeg, *.gif,
              *.docx, *.pdf
            </Typography>
          </Box>
        </Box>
      </div>
      {files.map(item => (
        <>
          <LinearProgress
            variant="determinate"
            key={item.file.name}
            value={item.progress}
          />
          <span>{item.progress}%</span>
        </>
      ))}
    </Box>
  );
};

export default FileUploader;
