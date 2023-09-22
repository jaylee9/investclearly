import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Box, InputAdornment, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from './Input';
import theme from '@/config/theme';

interface CustomDateRangePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  topLabel?: string;
  placeholder?: string;
}

const CustomDateRangePicker = <T extends FieldValues>({
  control,
  name,
  topLabel,
  placeholder,
}: CustomDateRangePickerProps<T>) => {
  return (
    <Box>
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
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            placeholderText={placeholder}
            customInput={
              <Input
                showClearOption={false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i
                        className="icon-Calendar"
                        style={{
                          fontSize: 24,
                          color: theme.palette.text.disabled,
                          cursor: 'pointer',
                        }}
                      ></i>
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        )}
      />
    </Box>
  );
};

export default CustomDateRangePicker;
