import { useState } from 'react';
import { ImageProps } from 'next/image';
import Image from 'next/image';
import { Box } from '@mui/material';

interface SkeletonImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  alt: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box
      sx={{
        background: !isLoaded
          ? 'linear-gradient(to right, #eceff1, #f6f7f8, #eceff1)'
          : undefined,
        animation: !isLoaded ? '$shimmer 1.5s infinite' : undefined,
        ...props.style,
      }}
    >
      <Box
        sx={{
          transition: 'opacity 0.2s',
          opacity: isLoaded ? 1 : 0,
          height: props.height,
          width: props?.style ? props.style.width : props.width,
        }}
      >
        <Image
          alt={alt}
          quality={90}
          {...props}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </Box>
    </Box>
  );
};

export default SkeletonImage;
