import { Box, Typography } from '@mui/material';
import { useBannerBlockStyles } from './styles';
import Button from '@/components/common/Button';
import Link from 'next/link';

interface WriteReviewBlockProps {
  title: string;
  buttonLabel: string;
  buttonHref: string;
  isMarginBottom?: boolean;
}

const BannerBlock = ({
  title,
  buttonLabel,
  buttonHref,
  isMarginBottom = false,
}: WriteReviewBlockProps) => {
  const classes = useBannerBlockStyles({ isMarginBottom });
  return (
    <Box sx={classes.root}>
      <Typography variant="h2">{title}</Typography>
      <Link href={buttonHref}>
        <Button variant="white">{buttonLabel}</Button>
      </Link>
    </Box>
  );
};

export default BannerBlock;
