import theme from '@/config/theme';
import { ToastType } from './customToast';

const { palette } = theme;

export const getToastStyles = ({ type }: { type: ToastType }) => {
  return {
    wrapper: {
      height: '100%',
      display: 'flex',
      alginItems: 'center',
      gap: '12px',
    },
    iconWrapper: {
      background: palette[type].contrastText,
      padding: '2px 8px',
      width: 'fit-content',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      '& i': {
        fontSize: '20px',
        color: palette[type].light,
      },
    },
    textWrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100%',
    },
    title: {
      fontWeight: 500,
      color: palette.common.black,
    },
    message: {
      color: palette.text.secondary,
    },
  };
};

export const getCloseIconStyles = () => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '16px',
      '& i': {
        fontSize: '24px',
        color: palette.text.disabled,
      },
    },
  };
};
