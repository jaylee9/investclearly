import theme from '@/config/theme';

const { palette } = theme;

export const useEditDealModalStyles = () => {
  return {
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
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    buttonsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      '& button': {
        width: '50%',
      },
    },
  };
};
