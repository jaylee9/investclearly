import theme from '@/config/theme';

const { palette, typography } = theme;

interface UseInputStylesProps {
  variant: 'filled' | 'outlined';
  errorText?: string;
  error?: boolean;
  isFilledWhite: boolean;
  height: 'base' | 'large';
}

export const useInputStyles = ({
  variant,
  errorText,
  error,
  isFilledWhite,
  height,
}: UseInputStylesProps) => {
  return {
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
    root: {
      position: 'relative',
      '& .MuiInputBase-root': {
        height: height === 'base' ? '44px' : '56px',
        fontSize: typography.body1,
        border:
          variant === 'outlined' ? `1px solid ${palette.secondary.dark}` : '',
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
    },
  };
};

interface UseCheckboxProps {
  error?: boolean;
}

export const useCheckboxStyles = ({ error }: UseCheckboxProps) => {
  return {
    root: {
      '&.MuiCheckbox-root': {
        padding: 0,
        marginRight: '12px',
        color: error ? palette.error.light : palette.text.disabled,
        '&:hover': {
          color: palette.secondary.dark,
        },
        '&:active': {
          color: palette.text.secondary,
        },
        '&.Mui-disabled': {
          color: palette.background.paper,
        },
        '&.Mui-checked': {
          color: palette.primary.light,
          '&:hover': {
            color: palette.primary.dark,
          },
          '&:active': {
            color: palette.primary.main,
          },
          '&.Mui-disabled': {
            color: palette.background.paper,
          },
        },
      },
    },
  };
};

interface UseButtonStylesProps {
  color: 'primary' | 'error';
  variant: 'main' | 'secondary' | 'tertiary' | 'white' | 'auth';
}

const disabledButtonBackground = {
  main: palette.text.disabled,
  secondary: palette.background.default,
  tertiary: 'transparent',
  white: palette.common.white,
  auth: 'transparent',
};
const disabledButtonColor = {
  main: palette.common.white,
  secondary: palette.text.disabled,
  tertiary: palette.text.disabled,
  white: palette.common.white,
  auth: palette.text.disabled,
};

export const useButtonStyles = ({ color, variant }: UseButtonStylesProps) => {
  return {
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
    root: {
      fontSize: typography.body1,
      fontWeight: 600,
      paddingX: '24px',
      paddingY: '12px',
      borderRadius: '48px',
      height: '44px',
      textTransform: 'none',
      '&.Mui-disabled': {
        background: disabledButtonBackground[variant],
        color: disabledButtonColor[variant],
      },
    },
  };
};
