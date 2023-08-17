import { ImageProps } from 'next/image';
import SkeletonImage from './SkeletonImage';

interface SkeletonImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  alt: string;
  type?: 'deal' | 'sponsor';
}

const PlaceholderImage: React.FC<SkeletonImageProps> = ({
  type = 'deal',
  ...props
}) => {
  const placeholderSrc =
    type === 'deal'
      ? '/assets/Deal-placeholder.png'
      : '/assets/Sponsor-placeholder.png';
  const { alt, src, ...rest } = props;
  return (
    <SkeletonImage
      alt={alt}
      quality={90}
      src={src || placeholderSrc}
      {...rest}
    />
  );
};

export default PlaceholderImage;
