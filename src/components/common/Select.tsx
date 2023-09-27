import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from '@mui/material';
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
  topLabel?: string;
}

const CustomSelect = ({
  options,
  variant = SelectVariant.Light,
  customStyles,
  topLabel,
  ...props
}: CustomSelectProps) => {
  const classes = useSelectStyles({ variant });
  const { multiple, value, onChange } = props;

  const handleRemoveValue = (valueToRemove: string) => {
    if (Array.isArray(value)) {
      const newValues = value.filter(value => value !== valueToRemove);
      if (onChange) {
        const syntheticEvent = {
          target: {
            name: props.name || '',
            value: newValues,
          },
        } as SelectChangeEvent<unknown>;
        onChange(syntheticEvent, newValues);
      }
    }
  };

  const renderedValue = (selected: unknown) => {
    // For multiple selections
    if (Array.isArray(selected)) {
      return (
        <Box sx={classes.tagsWrapper}>
          {selected.map(
            (selectedItem, index) =>
              index <= 1 && (
                <Typography variant="body1" key={selectedItem} sx={classes.tag}>
                  {selectedItem}
                  <i
                    className="icon-Cross"
                    onClick={() => handleRemoveValue(selectedItem)}
                    onMouseDown={event => event.stopPropagation()}
                  />
                </Typography>
              )
          )}
          {selected.length > 2 && (
            <Typography variant="body1">+{selected.length - 2}</Typography>
          )}
        </Box>
      );
    }

    return (
      <Typography variant="body1" sx={classes.singleSelectedItem}>
        {options.find(item => item.value === selected)?.label}
      </Typography>
    );
  };

  const selectValue =
    multiple && Array.isArray(value) && value.length === 0 ? [''] : value;

  return (
    <FormControl fullWidth>
      {topLabel && (
        <Typography
          variant="caption"
          fontWeight={600}
          marginBottom="4px"
          display="block"
        >
          {topLabel}
        </Typography>
      )}
      <Box sx={classes.selectWrapper}>
        <Select
          value={selectValue}
          sx={classes.root}
          style={customStyles}
          MenuProps={{
            sx: classes.menuPaper,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            transformOrigin: {
              vertical: -44,
              horizontal: 'center',
            },
          }}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={renderedValue}
          {...props}
        >
          <MenuItem value="" style={{ display: 'none' }}>
            None
          </MenuItem>
          {options.map(item => (
            <MenuItem
              disableRipple
              value={item.value}
              key={item.value}
              sx={classes.menuItem}
            >
              {item.label}
              {Array.isArray(value) &&
                multiple &&
                value.includes(item.value) && <i className="icon-Check"></i>}
            </MenuItem>
          ))}
        </Select>
        {((multiple && Array.isArray(value) && value.length === 0) ||
          (!multiple && !value)) && (
          <Typography
            variant="body1"
            sx={classes.fauxPlaceholder}
            style={{
              display:
                (multiple && Array.isArray(value) && value.length === 0) ||
                (!multiple && !value)
                  ? 'block'
                  : 'none',
            }}
          >
            {props.placeholder}
          </Typography>
        )}
      </Box>
    </FormControl>
  );
};

export default CustomSelect;
