import theme from '@/config/theme';

const useResetPasswordStyles = () => {
  return {
    root: {
      textAlign: 'center',
    },
    infoText: {
      marginBottom: '40px',
      color: theme.palette.text.secondary,
    },
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '420px',
      marginBottom: '16px',
    },
    rememberPassword: {
      '& a': {
        color: theme.palette.primary.light,
      },
    },
  };
};

export default useResetPasswordStyles;
