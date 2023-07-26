import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { useSliderStyles } from './styles';
import Input from './Input';

interface CustomSliderProps {
  min: number;
  max: number;
  onChange?: (value: number[] | number) => void;
}

const CustomSlider = ({ min, max, onChange }: CustomSliderProps) => {
  const classes = useSliderStyles();
  const [value, setValue] = useState(max ? [min, max] : min);
  const [inputValues, setInputValues] = useState(
    max ? [String(min), String(max)] : [String(min)]
  );

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
    setInputValues(
      Array.isArray(newValue) ? newValue.map(String) : [String(newValue)]
    );
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleInputChange = (index: number, inputValue: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = inputValue;
    setInputValues(newInputValues);

    const newValue = newInputValues.map(Number);
    if (Array.isArray(newValue)) {
      if (
        newValue[0] >= min &&
        newValue[0] <= max &&
        newValue[1] <= max &&
        newValue[1] >= min
      ) {
        setValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      } else {
        setValue([min, max]);
      }
    } else {
      if (newValue[0] >= min && newValue[0] <= max) {
        setValue(newValue[0]);
        if (onChange) {
          onChange(newValue[0]);
        }
      }
    }
  };

  return (
    <Box>
      <Box sx={classes.inputsWrapper}>
        <Input
          value={inputValues[0]}
          onChange={e => handleInputChange(0, e.target.value)}
          showClearOption={false}
        />
        {max && (
          <>
            <Typography variant="body1">-</Typography>
            <Input
              value={inputValues[1]}
              onChange={e => handleInputChange(1, e.target.value)}
              showClearOption={false}
            />
          </>
        )}
      </Box>
      <Slider
        value={value}
        onChange={handleChangeSlider}
        max={max}
        min={min}
        sx={classes.root}
      />
    </Box>
  );
};

export default CustomSlider;
