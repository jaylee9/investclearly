import {
  Box,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from '@mui/material';
import { useCustomTextAreaStyles } from './styles';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

interface CustomTextAreaProps extends TextareaAutosizeProps {
  height?: string;
  errorText?: string;
  error?: boolean;
  register?: UseFormRegisterReturn;
}

const CustomTextArea = ({
  height,
  errorText,
  error,
  register,
  ...props
}: CustomTextAreaProps) => {
  const classes = useCustomTextAreaStyles();
  const [value, setValue] = useState('');
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    if (register) {
      register.onChange(e);
    }
  };
  return (
    <Box sx={{ height, position: 'relative' }}>
      <TextareaAutosize
        className={`text-area ${error || errorText ? 'text-area-error' : ''}`}
        style={{ resize: 'none', ...classes.root }}
        value={value}
        onChange={handleChange}
        {...props}
        {...(register
          ? {
              name: register.name,
              ref: register.ref,
              onBlur: register.onBlur,
            }
          : {})}
      />
      {errorText && (
        <Typography variant="caption" sx={classes.errorText}>
          {errorText}
        </Typography>
      )}
    </Box>
  );
};

export default CustomTextArea;
