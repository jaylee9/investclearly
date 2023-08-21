import getInitials from '@/helpers/getInitials';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useUserAvatarStyles } from './styles';

interface UserAvatarProps {
  src?: string | null;
  name: string;
  width: number;
  height: number;
}

const UserAvatar = ({ src, name, width, height }: UserAvatarProps) => {
  const classes = useUserAvatarStyles();
  return src ? (
    <Image src={src} width={width} height={height} alt="user avatar" />
  ) : (
    <Box sx={{ ...classes.root, width, height }}>
      <Typography variant="body1">{getInitials(name)}</Typography>
    </Box>
  );
};

export default UserAvatar;
