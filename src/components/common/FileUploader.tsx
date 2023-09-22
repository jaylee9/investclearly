import { Box, Fade, Typography } from '@mui/material';
import { useFileUploaderStyles } from './styles';
import { Accept, useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';
import Image from 'next/image';

interface FileItem {
  id: string;
  file: File;
  status: 'error' | 'loaded';
  error: DOMException | null;
  reader: FileReader;
}

interface FileUploaderProps {
  onUpload: (file: File) => void;
  onDelete: (file?: File) => void;
  isLoading?: boolean;
  type?: 'MultipleFile' | 'SingleImage';
  defaultImage?: string;
}

const FileUploader = ({
  onUpload,
  onDelete,
  isLoading,
  type = 'MultipleFile',
  defaultImage,
}: FileUploaderProps) => {
  const classes = useFileUploaderStyles();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [fileLengthError, setFileLengthError] = useState<boolean>(false);
  const maxSize = 10 * 1024 * 1024;
  const handleFiles = (acceptedFiles: File[]) => {
    setFileLengthError(false);
    if (acceptedFiles.length + files.length > 3) {
      setFileLengthError(true);
      setTimeout(() => {
        setFileLengthError(false);
      }, 2000);
      return;
    }
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      const fileItem: FileItem = {
        id: uuidv4(),
        file,
        status: 'loaded',
        error: null,
        reader,
      };

      reader.onerror = () => {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.file === file ? { ...f, status: 'error', error: reader.error } : f
          )
        );
      };

      reader.onloadend = () => {
        if (fileItem.status !== 'error') {
          onUpload(fileItem.file);
        }
      };

      reader.readAsDataURL(file);
      setFiles(prevFiles => [...prevFiles, fileItem]);
    });
  };

  const deleteFile = (fileId: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (fileToDelete && fileToDelete.status !== 'error') {
      onDelete(fileToDelete.file);
    }
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
  };

  const singleDelete = () => {
    setFiles([]);
    onDelete();
  };

  const retryUpload = (file: File) => {
    setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
    handleFiles([file]);
  };

  const accept =
    type === 'MultipleFile'
      ? {
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'image/gif': ['.gif'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ['.docx'],
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
        }
      : {
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
        };

  const { getRootProps, getInputProps } = useDropzone({
    maxSize,
    disabled: isLoading,
    accept: accept as Accept,
    onDrop: handleFiles,
    multiple: type === 'MultipleFile',
  });

  const rules =
    type === 'MultipleFile' ? (
      <Typography variant="caption" sx={classes.infoText}>
        <span className={fileLengthError ? 'fileLengthError' : 'fileLength'}>
          Max 3 files
        </span>
        , 10 MB each. Accepted formats: *.jpg, *.jpeg,*.png, *.gif, *.docx,
        *.doc, *.pdf
      </Typography>
    ) : (
      <Typography variant="caption" sx={classes.infoText}>
        Max 10 MB.
        <br />
        Accepted formats: *.jpg, *.jpeg, *.png
      </Typography>
    );

  console.log(
    (files.length < 3 && type === 'MultipleFile') ||
      ((files.length < 1 || !defaultImage) && type === 'SingleImage')
  );

  return (
    <Box sx={classes.root}>
      <Fade
        in={
          (files.length < 3 && type === 'MultipleFile') ||
          (files.length < 1 && type === 'SingleImage')
        }
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {((files.length < 3 && type === 'MultipleFile') ||
            ((files.length < 1 || !defaultImage) &&
              type === 'SingleImage')) && (
            <Box sx={classes.dropZone}>
              {isLoading ? <Loading /> : <i className="icon-Upload"></i>}
              <Box sx={classes.dropZoneContent}>
                <Typography variant="body1" fontWeight={600} marginBottom="4px">
                  Drag and drop or Click to upload files
                </Typography>
                {rules}
              </Box>
            </Box>
          )}
        </div>
      </Fade>
      {(defaultImage || !!files.length) && (
        <Box sx={classes.previewImageWrapper}>
          <Image
            src={defaultImage || URL.createObjectURL(files?.[0].file)}
            alt="123"
            width={300}
            height={200}
            style={{ objectFit: 'cover' }}
          />
          <Box sx={classes.iconCrossWrapper} onClick={singleDelete}>
            <i className="icon-Cross" />
          </Box>
        </Box>
      )}
      {type === 'MultipleFile' && (
        <Box sx={classes.filesWrapper}>
          {files.map(item => (
            <Fade in={true} key={item.id}>
              <Box sx={classes.file} className={item.status}>
                <Box sx={classes.mainFileInfo}>
                  <i className="icon-File"></i>
                  <Box>
                    <Typography variant="body1" sx={classes.fileName}>
                      {item.file.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={classes.fileSize}
                      className={`${item.status}-text`}
                    >
                      {item.status === 'error'
                        ? 'Error while uploading file'
                        : `${(item.file.size / 1048576).toFixed(2)} MB`}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={classes.actionsWrapper}>
                  {item.status === 'error' && (
                    <i
                      className="icon-Reload"
                      onClick={() => retryUpload(item.file)}
                    ></i>
                  )}
                  <i
                    className="icon-Delete"
                    onClick={() => deleteFile(item.id)}
                  ></i>
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>
      )}
      {type === 'MultipleFile' && (
        <Typography sx={classes.additionalInfo}>
          Your provided files are securely processed and immediately deleted
          after verification, ensuring the privacy and confidentiality of your
          information.
        </Typography>
      )}
    </Box>
  );
};

export default FileUploader;
