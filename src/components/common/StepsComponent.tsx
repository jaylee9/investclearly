import { Box, Typography } from '@mui/material';
import { useStepsComponentStyles } from './styles';
import clsx from 'clsx';

interface StepsComponentProps {
  currentStep: number;
  steps: string[];
}

const StepsComponent = ({ currentStep, steps }: StepsComponentProps) => {
  const classes = useStepsComponentStyles();
  const stepIndicatorClassName = (index: number) =>
    clsx('step-status', {
      'step-status-current': index === currentStep,
      'step-status-completed': index < currentStep,
    });

  const stepLabelClassName = (index: number) =>
    clsx('step-label', {
      'step-label-current': index === currentStep,
      'step-label-completed': index < currentStep,
    });
  return (
    <Box sx={classes.root}>
      {steps.map((step, index) => (
        <Box key={index} sx={classes.stepWrapper}>
          <Box sx={classes.defaultStep}>
            <Typography
              variant="body1"
              className={stepIndicatorClassName(index)}
            >
              {index < currentStep ? <i className="icon-Check"></i> : index + 1}
            </Typography>
            <Typography variant="body1" className={stepLabelClassName(index)}>
              {step}
            </Typography>
          </Box>
          {index < steps.length - 1 && <Box sx={classes.divider} />}
        </Box>
      ))}
    </Box>
  );
};

export default StepsComponent;
