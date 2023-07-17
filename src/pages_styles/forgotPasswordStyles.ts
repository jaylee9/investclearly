import theme from '@/config/theme';

const useForgotPasswordStyles = () => {
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
      gap: '32px',
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

export default useForgotPasswordStyles;
