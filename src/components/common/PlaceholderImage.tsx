import { ImageProps } from 'next/image';
import SkeletonImage from './SkeletonImage';
import { useEffect, useState } from 'react';

interface SkeletonImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  alt: string;
  defaultImage: string;
}

const PlaceholderImage: React.FC<SkeletonImageProps> = ({
  defaultImage,
  ...props
}) => {
  const { alt, src, ...rest } = props;
  const [srcState, setSrcState] = useState(src || defaultImage);
  useEffect(() => {
    if (src) {
      setSrcState(src);
    }
  }, [src]);
  return (
    <SkeletonImage
      alt={alt}
      quality={90}
      src={srcState}
      onError={() => setSrcState(defaultImage)}
      {...rest}
    />
  );
};

export default PlaceholderImage;
