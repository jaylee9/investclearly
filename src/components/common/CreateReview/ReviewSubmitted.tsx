import { Box, Typography } from '@mui/material';
import { useReviewSubmittedStyles } from './styles';
import Button from '../Button';
import Link from 'next/link';

interface ReviewSubmittedProps {
  handleClose: (e: MouseEvent | object) => void;
  setStep: (value: number) => void;
}

const ReviewSubmitted = ({ handleClose, setStep }: ReviewSubmittedProps) => {
  const classes = useReviewSubmittedStyles();
  const handleFirstStep = () => setStep(0);
  const handleGoToHomepage = (e: MouseEvent | object) => {
    setStep(0);
    handleClose(e);
  };

  return (
    <Box sx={classes.root}>
      <Box sx={classes.container}>
        <Typography
          variant="h3"
          fontWeight={600}
          marginBottom="4px"
          textAlign="center"
        >
          Your review has been submitted!
        </Typography>
        <Typography variant="body1" sx={classes.subTitle} textAlign="center">
          It will be published after moderation.
        </Typography>
        <Box sx={classes.buttonsWrapper}>
          <Button variant="secondary" onClick={handleFirstStep}>
            Leave another review
          </Button>
          <Link href="/" onClick={handleGoToHomepage}>
            <Button sxCustomStyles={classes.link}>To the homepage</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewSubmitted;
