import {
  TextField,
  Fade,
  InputAdornment,
  Box,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import { TextFieldProps } from '@mui/material';
import { CSSProperties, ChangeEvent, ReactNode, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useInputStyles } from './styles';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'filled' | 'outlined';
  isFilledWhite?: boolean;
  errorText?: string;
  error?: boolean;
  isSearch?: boolean;
  showClearOption?: boolean;
  isPassword?: boolean;
  customStyles?: CSSProperties;
  sxCustomStyles?: SxProps<Theme>;
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
  customStyles = {},
  sxCustomStyles = {},
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
  const [value, setValue] = useState(props.value || '');
  const [showPassword, setShowPassword] = useState(!isPassword);
  const handleShowPassword = () => {
    if (props.disabled) {
      return;
    }
    setShowPassword(!showPassword);
  };
  const styles = useInputStyles({
    variant,
    errorText,
    error,
    isFilledWhite,
    height,
    disabled: props.disabled,
  });
  const sxStyles = {
    ...styles[variant],
    ...styles.root,
    ...sxCustomStyles,
  };
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      {!!topLabel && (
        <Typography variant="caption" fontWeight={600} sx={styles.topLabel}>
          {topLabel}
          {props.required && <span className="required-star">*</span>}
        </Typography>
      )}
      <TextField
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        helperText={errorText}
        sx={sxStyles as SxProps<Theme>}
        style={customStyles}
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
                  <InputAdornment position="end" onClick={handleClear}>
                    <i className="icon-Cross"></i>
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
