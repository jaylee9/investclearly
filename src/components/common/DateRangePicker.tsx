import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import DatePicker from 'react-date-picker';

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
          <DatePicker value={value} onChange={date => onChange(date)} />
        )}
      />
    </Box>
  );
};

export default CustomDateRangePicker;
