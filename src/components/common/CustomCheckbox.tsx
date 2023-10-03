import { Checkbox, FormControlLabel, SxProps, Theme } from '@mui/material';
import { CheckboxProps } from '@mui/material';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
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

  const { onChange, checked, ...rest } = props;

  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
    setIsChecked(prevChecked => !prevChecked);
    if (onChange) {
      onChange(e, value);
    }
  };

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          disableRipple
          sx={checkboxStyles.root}
          onChange={handleChange}
          checked={isChecked}
          {...rest}
        />
      }
      label={label}
      sx={{ margin: 0, ...customStyles }}
    />
  );
};

export default CustomCheckbox;
