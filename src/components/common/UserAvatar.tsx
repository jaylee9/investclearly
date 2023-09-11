import getInitials from '@/helpers/getInitials';
import { Box, Typography } from '@mui/material';
import { useUserAvatarStyles } from './styles';
import SkeletonImage from './SkeletonImage';

interface UserAvatarProps {
  src?: string | null;
  name: string;
  width: number;
  height: number;
}

const UserAvatar = ({ src, name, width, height }: UserAvatarProps) => {
  const classes = useUserAvatarStyles();
  return src ? (
    <SkeletonImage
      src={src}
      width={width}
      height={height}
      alt="user avatar"
      style={{ borderRadius: '1230px' }}
    />
  ) : (
    <Box sx={{ ...classes.root, width, height }}>
      <Typography variant="body1">{getInitials(name)}</Typography>
    </Box>
  );
};

export default UserAvatar;
