import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from './Input';

interface CustomDateRangePickerProps {
  control: Control;
  name: string;
  topLabel?: string;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  control,
  name,
  topLabel,
}) => {
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
            onChange={date => onChange(date)}
            customInput={<Input showClearOption={false} />}
            className="custom-date-picker"
          />
        )}
      />
    </Box>
  );
};

export default CustomDateRangePicker;
