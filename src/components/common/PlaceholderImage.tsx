import { ImageProps } from 'next/image';
import SkeletonImage from './SkeletonImage';

interface SkeletonImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  alt: string;
  defaultImage: string;
}

const PlaceholderImage: React.FC<SkeletonImageProps> = ({
  defaultImage,
  ...props
}) => {
  const { alt, src, ...rest } = props;
  return (
    <SkeletonImage alt={alt} quality={90} src={src || defaultImage} {...rest} />
  );
};

export default PlaceholderImage;
