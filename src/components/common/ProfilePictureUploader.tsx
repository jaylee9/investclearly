import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import UserAvatar from './UserAvatar';
import { useProfilePictureUploaderStyles } from './styles';
import { useState } from 'react';
import PlaceholderImage from './PlaceholderImage';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';

export enum ProfilePictureUploaderVariant {
  USER = 'user',
  SPONSOR = 'sponsor',
}

interface ProfilePictureUploader {
  username?: string;
  defaultImage?: string | null;
  onChange: (value: File) => void;
  variant?: ProfilePictureUploaderVariant;
}

const ProfilePictureUploader = ({
  username,
  defaultImage,
  onChange,
  variant = ProfilePictureUploaderVariant.USER,
}: ProfilePictureUploader) => {
  const classes = useProfilePictureUploaderStyles();

  const [src, setSrc] = useState(defaultImage);

  const maxSize = 2 * 1024 * 1024;

  const { getRootProps, getInputProps } = useDropzone({
    maxSize,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    onDrop: acceptedFiles => {
      setSrc(acceptedFiles.map(file => URL.createObjectURL(file))[0]);
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
  });

  return (
    <Box sx={classes.root}>
      <div {...getRootProps()} style={{ width: 'fit-content' }}>
        <input {...getInputProps()} />
        <Box sx={classes.uploader}>
          {variant === ProfilePictureUploaderVariant.USER && !!username && (
            <UserAvatar
              src={src}
              name={username as string}
              width={120}
              height={120}
            />
          )}
          {variant === ProfilePictureUploaderVariant.SPONSOR && (
            <PlaceholderImage
              alt="Sponsor avatar"
              src={src as string}
              width={120}
              height={120}
              defaultImage={DEFAULT_SPONSOR_IMAGE}
              style={{ borderRadius: '1230px' }}
            />
          )}
          <Box sx={classes.uploadIconWrapper}>
            <Box className="uploadIcon">
              <i className={src ? 'icon-Edit' : 'icon-Plus'} />
            </Box>
          </Box>
        </Box>
      </div>
      <Box>
        <Typography variant="caption" sx={classes.title}>
          {variant === ProfilePictureUploaderVariant.USER
            ? 'Profile Picture'
            : 'Business Avatar'}
        </Typography>
        <Box sx={classes.rules}>
          <Typography variant="caption">
            Recommended resolution is 300x300 px.
          </Typography>
          <Typography variant="caption">Max size - 2 MB.</Typography>
          <Typography variant="caption">
            Allowed formats: *.jpg, *.jpeg, *.png, *.gif
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePictureUploader;
