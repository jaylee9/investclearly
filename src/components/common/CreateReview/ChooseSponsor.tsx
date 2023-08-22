import { Box, Typography } from '@mui/material';
import { useChooseSponsorStepStyles } from './styles';
import TagSelector from '../TagSelector';
import { useState } from 'react';
import Button from '../Button';

interface ChooseSponsorStepProps {
  setStep: (value: number) => void;
  step: number;
}

const ChooseSponsorStep = ({ setStep, step }: ChooseSponsorStepProps) => {
  const classes = useChooseSponsorStepStyles();
  const [tagSelectorValue, setTagSelectorValue] = useState('');
  const [tag, setTag] = useState('');
  const handleClearTag = () => {
    setTag('');
  };
  const handleSkipPage = () => {
    setStep(step + 1);
  };
  const handleNextPage = () => {
    setStep(step + 1);
  };

  return (
    <Box sx={classes.root}>
      <Box sx={classes.content}>
        <Typography variant="h4" fontWeight={600}>
          What Deal have you worked with the Sponsor on?
        </Typography>
        <Typography variant="body1" sx={classes.subTitle}>
          You can share any previous deal. Providing this information is
          optional, feel free to skip this step if you prefer.
        </Typography>
        <Box width="100%">
          <TagSelector
            inputValue={tagSelectorValue}
            onChange={setTagSelectorValue}
            activeTag={tag}
            onClearTags={handleClearTag}
          >
            <Box></Box>
          </TagSelector>
        </Box>
      </Box>
      <Box sx={classes.buttonsWrapper}>
        <Button variant="secondary" onClick={handleSkipPage}>
          Skip
        </Button>
        <Button onClick={handleNextPage}>Next</Button>
      </Box>
    </Box>
  );
};

export default ChooseSponsorStep;
