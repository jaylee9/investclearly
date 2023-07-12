import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  SxProps,
  Theme,
} from '@mui/material';
import theme from '@/config/theme';

interface IButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  variant?: 'main' | 'secondary' | 'tertiary' | 'white';
  color?: 'primary' | 'error';
  customStyles?: SxProps<Theme>;
}

const Button = ({
  variant = 'main',
  color = 'primary',
  customStyles,
  ...props
}: IButtonProps) => {
  const { palette, typography } = theme;
  const disabledBackground = {
    main: palette.text.disabled,
    secondary: palette.background.default,
    tertiary: 'transparent',
    white: palette.common.white,
  };
  const disabledColor = {
    main: palette.common.white,
    secondary: palette.text.disabled,
    tertiary: palette.text.disabled,
    white: palette.common.white,
  };
  const styles = {
    main: {
      background: palette[color].light,
      color: palette.common.white,
      '&:hover': {
        background: palette[color].dark,
      },
      '&:active': {
        background: palette[color].main,
      },
    },
    secondary: {
      color: palette[color].light,
      background: palette[color].contrastText,
      '&:hover': {
        background: palette[color].contrastText,
        color: palette[color].dark,
      },
      '&:active': {
        color: palette[color].main,
      },
    },
    tertiary: {
      background: 'transparent',
      color: palette[color].light,
      '&:hover': {
        background: 'transparent',
        color: palette[color].dark,
      },
      '&:active': {
        color: palette[color].main,
      },
    },
    white: {
      background: palette.common.white,
      color: palette[color].light,
      '&:hover': {
        background: palette.common.white,
        color: palette[color].dark,
      },
      '&:active': {
        color: palette[color].main,
      },
    },
  };
  return (
    <MUIButton
      sx={{
        ...styles[variant],
        ...customStyles,
        fontSize: typography.body1,
        fontWeight: 600,
        paddingX: '24px',
        paddingY: '12px',
        borderRadius: '48px',
        textTransform: 'none',
        '&.Mui-disabled': {
          background: disabledBackground[variant],
          color: disabledColor[variant],
        },
      }}
      disableRipple
      {...props}
    />
  );
};

export default Button;
