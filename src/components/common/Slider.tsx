import { Box, Slider, SliderProps, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSliderStyles } from './styles';
import Input from './Input';

interface CustomSliderProps
  extends Omit<SliderProps, 'min' | 'max' | 'onChange'> {
  min: number;
  max: number;
  onChange?: (value: number[] | number) => void;
}

const CustomSlider = ({ min, max, onChange, ...props }: CustomSliderProps) => {
  const classes = useSliderStyles();
  const [value, setValue] = useState<number[]>(props.value as number[]);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleInputChange = (index: number, inputValue: string) => {
    const newValue = [...value];
    newValue[index] = Number(inputValue);
    setValue(newValue);
    if (
      newValue[0] >= min &&
      newValue[0] <= max &&
      newValue[1] >= min &&
      newValue[1] <= max
    ) {
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  useEffect(() => {
    setValue(props.value as number[]);
  }, [props.value]);

  return (
    <Box>
      <Box sx={classes.inputsWrapper}>
        <Input
          value={Array.isArray(value) ? String(value[0]) : ''}
          onChange={e => handleInputChange(0, e.target.value)}
          showClearOption={false}
        />
        <Typography variant="body1">-</Typography>
        <Input
          value={Array.isArray(value) ? String(value[1]) : ''}
          onChange={e => handleInputChange(1, e.target.value)}
          showClearOption={false}
        />
      </Box>
      <Slider
        value={value}
        onChange={handleChangeSlider}
        max={max}
        min={min}
        sx={classes.root}
        {...props}
      />
    </Box>
  );
};

export default CustomSlider;
