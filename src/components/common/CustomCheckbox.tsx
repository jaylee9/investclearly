import { Checkbox, FormControlLabel, SxProps, Theme } from '@mui/material';
import { CheckboxProps } from '@mui/material';
import { ReactNode } from 'react';
import { useCheckboxStyles } from './styles';

interface CustomCheckboxProps extends CheckboxProps {
  label?: string | ReactNode;
  customStyles?: SxProps<Theme>;
  error?: boolean;
}

const CustomCheckbox = ({
  label,
  customStyles,
  error,
  ...props
}: CustomCheckboxProps) => {
  const checkboxStyles = useCheckboxStyles({ error });
  return (
    <FormControlLabel
      control={<Checkbox disableRipple sx={checkboxStyles.root} {...props} />}
      label={label}
      sx={{ margin: 0, ...customStyles }}
    />
  );
};

export default CustomCheckbox;
