import { Box, BoxProps, Typography } from '@mui/material';
import { useMultiButtonsStyles } from './styles';

interface IButton {
  label: string;
  value: string;
}

interface MultiButtonsProps extends BoxProps {
  buttons: IButton[];
  activeValues: string[];
  onButtonClick: (value: string) => void;
  label?: string;
}

const MultiButtons = ({
  buttons,
  activeValues,
  onButtonClick,
  label,
  ...props
}: MultiButtonsProps) => {
  console.log(activeValues);
  const classes = useMultiButtonsStyles();
  const multiButtonSx = (active: boolean) =>
    active
      ? { ...classes.multiButton, ...classes.activeMultiButton }
      : classes.multiButton;
  return (
    <Box>
      {label && (
        <Typography variant="caption" sx={classes.label}>
          {label}
        </Typography>
      )}
      <Box sx={classes.root} {...props}>
        {buttons.map(item => (
          <Box
            sx={multiButtonSx(activeValues.includes(item.value))}
            key={item.value}
            onClick={() => onButtonClick(item.value)}
          >
            <Typography variant="body1">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultiButtons;
