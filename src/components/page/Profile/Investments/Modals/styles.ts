import theme from '@/config/theme';

const { palette } = theme;

export const useEditDealModalStyles = () => {
  return {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    form: {
      height: '100%',
    },
    formContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '24px',
    },
    formContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    symbol: {
      color: palette.text.disabled,
    },
    submitButton: {
      width: '100%',
    },
  };
};

export const useDeleteDealModalStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    textBox: {
      textAlign: 'center',
      marginBottom: '24px',
    },
    title: {
      fontWeight: '600',
      marginBottom: '4px',
    },
    subTitle: {
      color: palette.text.secondary,
    },
    buttonsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: { xs: 'column-reverse', md: 'row' },
    },
    button: {
      width: { xs: '100%', md: '50%' },
    },
  };
};
