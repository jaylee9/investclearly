import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { BoxProps } from '@mui/material';
import theme from '@/config/theme';
import Image from 'next/image';

interface DealCardProps extends BoxProps {
  variant?: 'base' | 'large';
  image: string;
  children: ReactNode;
}

const DealCard = ({
  variant = 'base',
  image,
  children,
  ...props
}: DealCardProps) => {
  return (
    <Box
      sx={{ ...props.sx, background: theme.palette.common.white }}
      display="flex"
      flexDirection="column"
      borderRadius="0px 0px 12px 12px"
      boxShadow={theme.customShadows.header}
    >
      <Image
        src={image}
        alt="deal image"
        width={292}
        height={172}
        style={{ borderRadius: '12px 12px 0px 0px', width: '100%' }}
      />
      {children}
    </Box>
  );
};

export default DealCard;
