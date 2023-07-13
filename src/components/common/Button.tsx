import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  SxProps,
  Theme,
} from '@mui/material';
import theme from '@/config/theme';

interface IButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  variant?: 'main' | 'secondary' | 'tertiary' | 'white' | 'auth';
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
    auth: 'transparent',
  };
  const disabledColor = {
    main: palette.common.white,
    secondary: palette.text.disabled,
    tertiary: palette.text.disabled,
    white: palette.common.white,
    auth: palette.text.disabled,
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
    auth: {
      background: 'transparent',
      color: palette.common.black,
      border: `1px solid ${palette.secondary.dark}`,
      '&:hover': {
        background: 'transparent',
        border: `1px solid ${palette.background.paper}`,
      },
      '&:active': {
        background: palette.background.default,
        border: `1px solid ${palette.secondary.dark}`,
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
        height: '44px',
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
