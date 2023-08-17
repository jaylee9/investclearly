import { Skeleton } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SkeletonImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  alt: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div>
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width={props.width || '100%'}
          height={props.height || '100%'}
          animation="wave"
          style={{ ...props.style }}
          {...props}
        />
      )}
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}>
        <Image
          alt={alt}
          onLoadingComplete={() => setIsLoaded(true)}
          style={{
            ...props.style,
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default SkeletonImage;
