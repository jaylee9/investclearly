import theme from '@/config/theme';
import {
  TextField,
  Fade,
  InputAdornment,
  Box,
  Typography,
} from '@mui/material';
import { TextFieldProps, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ChangeEvent, ReactNode, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'filled' | 'outlined';
  isFilledWhite?: boolean;
  errorText?: string;
  error?: boolean;
  isSearch?: boolean;
  showClearOption?: boolean;
  isPassword?: boolean;
  customStyles?: SxProps<Theme>;
  height?: 'base' | 'large';
  endComponent?: ReactNode;
  register?: UseFormRegisterReturn;
  onClear?: () => void;
  topLabel?: string;
}

const Input = ({
  variant = 'outlined',
  errorText,
  isSearch,
  showClearOption = true,
  isFilledWhite = false,
  customStyles,
  height = 'base',
  endComponent,
  register,
  onChange,
  onClear,
  error,
  isPassword = false,
  topLabel,
  ...props
}: InputProps) => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(!isPassword);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { palette, typography } = theme;
  const styles = {
    filled: {
      width: '100%',
      borderRadius: '120px',
      '& .MuiOutlinedInput-root': {
        background: isFilledWhite
          ? palette.common.white
          : palette.background.default,
        borderRadius: '120px',
        border: `1px solid ${palette.background.default}`,
        transition: 'border 0.3s ease-in-out',
      },
    },
    outlined: {
      width: '100%',
      borderRadius: '12px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        border: `1px solid ${
          errorText || error ? palette.error.light : palette.background.default
        } ${errorText || error ? '!important' : ''}`,
        transition: 'border 0.3s ease-in-out',
        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
          {
            padding: '0px',
            borderRadius: 0,
            marginLeft: '15px',
          },
      },
    },
  };
  const handleClear = () => {
    setValue('');
    if (onClear) {
      onClear();
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    if (register) {
      register.onChange(e);
    }
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <Box textAlign="start">
      {topLabel && (
        <Typography variant="caption" fontWeight={600}>
          {topLabel}
        </Typography>
      )}
      <TextField
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        helperText={errorText}
        sx={{
          ...styles[variant],
          ...customStyles,
          position: 'relative',
          '& .MuiInputBase-root': {
            height: height === 'base' ? '44px' : '56px',
            fontSize: typography.body1,
            border:
              variant === 'outlined'
                ? `1px solid ${palette.secondary.dark}`
                : '',
          },
          '& fieldset': {
            border: 'none',
          },
          '& .MuiOutlinedInput-root:hover': {
            border: `1px solid ${palette.secondary.dark}`,
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            border: `1px solid ${palette.primary.light}`,
            background: palette.common.white,
          },
          '& .MuiFormHelperText-root': {
            color: palette.error.light,
            fontSize: typography.caption,
            position: 'absolute',
            bottom: '-20px',
          },
        }}
        InputProps={{
          startAdornment: isSearch && (
            <InputAdornment position="start">
              <i
                className="icon-Search"
                style={{ fontSize: 24 }}
                onClick={handleClear}
              ></i>
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {showClearOption && (
                <Fade in={!!value}>
                  <InputAdornment position="end">
                    <i
                      className="icon-Cross"
                      style={{ cursor: 'pointer', fontSize: 24 }}
                      onClick={handleClear}
                    ></i>
                  </InputAdornment>
                </Fade>
              )}
              {isPassword && (
                <InputAdornment position="end">
                  <i
                    onClick={handleShowPassword}
                    className={
                      !showPassword ? 'icon-Eye-opened' : 'icon-Eye-closed'
                    }
                    style={{ cursor: 'pointer', fontSize: 24 }}
                  ></i>
                </InputAdornment>
              )}
              <InputAdornment position="end">{endComponent}</InputAdornment>
            </>
          ),
        }}
        {...props}
        {...(register
          ? {
              name: register.name,
              ref: register.ref,
              onBlur: register.onBlur,
            }
          : {})}
      />
    </Box>
  );
};

export default Input;
