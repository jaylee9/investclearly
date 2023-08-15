import theme from '@/config/theme';

const { palette } = theme;

export const useAddDealModalStyles = () => {
  return {
    root: {
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
    symbol: {
      color: palette.text.disabled,
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    submitButton: { width: '100%' },
  };
};

export const useClaimDealModalStyles = () => {
  return {
    root: {
      height: '440px',
      width: '370px',
      boxSizing: 'border-box',
      '& h3': {
        fontWeight: 600,
        marginBottom: '24px',
      },
    },
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '24px',
      width: '370px',
      '& .MuiBox-root': {
        width: '100%',
      },
    },
    submitButton: {
      width: '100%',
    },
    secondStepWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
    subTitle: {
      color: palette.text.secondary,
      textAlign: 'center',
      marginBottom: '24px',
    },
  };
};

export const useSuggestEditModalStyles = () => {
  return {
    root: {
      height: '376px',
      width: '370px',
      boxSizing: 'border-box',
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '24px',
      width: '370px',
      '& .MuiBox-root': {
        width: '100%',
      },
    },
    submitButton: {
      width: '100%',
    },
    secondStepWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
  };
};
