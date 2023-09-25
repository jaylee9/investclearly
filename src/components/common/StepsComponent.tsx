import { Box, Typography } from '@mui/material';
import { useStepsComponentStyles } from './styles';
import clsx from 'clsx';
import { useBreakpoints } from '@/hooks/useBreakpoints';

interface StepsComponentProps {
  currentStep: number;
  steps: string[];
  isEditable?: boolean;
  setStep?: (v: number) => void;
}

const StepsComponent = ({
  currentStep,
  steps,
  isEditable,
  setStep,
}: StepsComponentProps) => {
  const { isMobile } = useBreakpoints();

  const classes = useStepsComponentStyles();
  const stepIndicatorClassName = (index: number) =>
    clsx('step-status', {
      'step-status-current': index === currentStep,
      'step-status-completed':
        index < currentStep || (index !== currentStep && isEditable),
    });

  const stepLabelClassName = (index: number) =>
    clsx('step-label', {
      'step-label-current': index === currentStep,
      'step-label-completed':
        index < currentStep || (index !== currentStep && isEditable),
    });

  const handleChangeStep = (value: number) => {
    if (setStep) {
      setStep(value);
    }
  };

  return (
    <Box sx={classes.root}>
      {steps.map((step, index) => {
        const mobileStepWrapper =
          index <= currentStep
            ? classes.activeMobileStepWrapper
            : classes.defaultMobileStepWrapper;

        const stepWrapper = isMobile
          ? mobileStepWrapper
          : classes.desktopStepWrapper;

        return (
          <Box key={index} sx={stepWrapper}>
            <Box
              sx={{
                ...classes.defaultStep,
                cursor:
                  isEditable && index !== currentStep ? 'pointer' : 'default',
              }}
              onClick={() => handleChangeStep(index)}
            >
              <Typography
                variant="body1"
                className={stepIndicatorClassName(index)}
              >
                {index < currentStep || isEditable ? (
                  <i className="icon-Check"></i>
                ) : (
                  index + 1
                )}
              </Typography>
              <Typography variant="body1" className={stepLabelClassName(index)}>
                {step}
              </Typography>
            </Box>
            {index < steps.length - 1 && <Box sx={classes.divider} />}
          </Box>
        );
      })}
    </Box>
  );
};

export default StepsComponent;
