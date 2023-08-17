import theme from '@/config/theme';

const { palette } = theme;

export const useClaimCompanyModalStyles = () => {
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
