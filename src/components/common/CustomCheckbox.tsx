import theme from '@/config/theme';
import { Checkbox, FormControlLabel, SxProps, Theme } from '@mui/material';
import { CheckboxProps } from '@mui/material';
import { ReactNode } from 'react';

interface CustomCheckboxProps extends CheckboxProps {
  label?: string | ReactNode;
  customStyles?: SxProps<Theme>;
  error?: Boolean;
}

const CustomCheckbox = ({
  label,
  customStyles,
  error,
  ...props
}: CustomCheckboxProps) => {
  const checkboxStyles = {
    padding: 0,
    marginRight: '12px',
    color: error ? theme.palette.error.light : theme.palette.text.disabled,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
    '&:active': {
      color: theme.palette.text.secondary,
    },
    '&.Mui-disabled': {
      color: theme.palette.background.paper,
    },
    '&.Mui-checked': {
      color: theme.palette.primary.light,
      '&:hover': {
        color: theme.palette.primary.dark,
      },
      '&:active': {
        color: theme.palette.primary.main,
      },
      '&.Mui-disabled': {
        color: theme.palette.background.paper,
      },
    },
  };
  return (
    <FormControlLabel
      control={<Checkbox disableRipple sx={checkboxStyles} {...props} />}
      label={label}
      sx={{ margin: 0, ...customStyles }}
    />
  );
};

export default CustomCheckbox;
