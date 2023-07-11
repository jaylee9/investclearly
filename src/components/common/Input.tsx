import theme from '@/config/theme';
import { TextField, Fade, InputAdornment } from '@mui/material';
import { TextFieldProps, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ReactNode, useState } from 'react';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'filled' | 'outlined';
  isFilledWhite?: boolean;
  errorText?: string;
  isSearch?: boolean;
  isClear?: boolean;
  customStyles?: SxProps<Theme>;
  height?: 'base' | 'large';
  endComponent?: ReactNode;
}

const Input = ({
  variant = 'outlined',
  errorText,
  isSearch,
  isClear = true,
  isFilledWhite = false,
  customStyles,
  height = 'base',
  endComponent,
  ...props
}: InputProps) => {
  const [value, setValue] = useState('');
  const { palette, typography } = theme;
  const styles = {
    filled: {
      width: '320px',
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
      width: '320px',
      borderRadius: '12px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        border: `1px solid ${
          errorText ? palette.error.light : palette.background.default
        } ${errorText ? '!important' : ''}`,
        transition: 'border 0.3s ease-in-out',
      },
    },
  };
  const handleClear = () => {
    setValue('');
  };
  return (
    <TextField
      value={value}
      onChange={e => setValue(e.target.value)}
      helperText={errorText}
      sx={{
        ...styles[variant],
        ...customStyles,
        '& .MuiInputBase-root': {
          height: height === 'base' ? '44px' : '56px',
          fontSize: typography.body1,
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
          background: palette.common.white,
          fontSize: typography.caption,
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
            {isClear && (
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
            <InputAdornment position="end">{endComponent}</InputAdornment>
          </>
        ),
      }}
      {...props}
    />
  );
};

export default Input;
