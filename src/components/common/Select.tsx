import { MenuItem, Select, SelectProps } from '@mui/material';
import { useSelectStyles } from './styles';
import { CSSProperties } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Option {
  value: string;
  label: string;
}

export enum SelectVariant {
  Light = 'light',
  Dark = 'dark',
}

interface CustomSelectProps extends Omit<SelectProps, 'variant'> {
  options: Option[];
  variant?: SelectVariant;
  customStyles?: CSSProperties;
}

const CustomSelect = ({
  options,
  variant = SelectVariant.Light,
  customStyles,
  ...props
}: CustomSelectProps) => {
  const classes = useSelectStyles({ variant });
  return (
    <Select
      value={
        props.placeholder
          ? props.value || 'none'
          : props.value || options[0].value
      }
      sx={classes.root}
      style={customStyles}
      MenuProps={{ sx: classes.menuPaper }}
      IconComponent={KeyboardArrowDownIcon}
      {...props}
    >
      <MenuItem value="none" disabled>
        {props.placeholder}
      </MenuItem>
      {options.map(item => (
        <MenuItem disableRipple value={item.value} key={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
