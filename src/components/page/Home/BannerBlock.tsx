import { Box, Typography } from '@mui/material';
import { useBannerBlockStyles } from './styles';
import Button from '@/components/common/Button';
import Link from 'next/link';

interface WriteReviewBlockProps {
  title: string;
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

const BannerBlock = ({
  title,
  buttonLabel,
  buttonHref,
  onButtonClick,
}: WriteReviewBlockProps) => {
  const classes = useBannerBlockStyles();
  return (
    <Box sx={classes.root}>
      <Typography variant="h2">{title}</Typography>
      {buttonHref && !onButtonClick ? (
        <Link href={buttonHref}>
          <Button variant="white">{buttonLabel}</Button>
        </Link>
      ) : (
        <Button variant="white" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default BannerBlock;
