import theme from '@/config/theme';

export const useAccreditedInvestorStepStyles = () => {
  return {
    root: {
      '& h4': {
        fontWeight: 600,
      },
      height: '94%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    subTitle: {
      color: theme.palette.text.secondary,
      marginBottom: '40px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'end',
      gap: '8px',
    },
  };
};

export const useWorthStepStyles = () => {
  return {
    root: {
      '& h4': {
        fontWeight: 600,
      },
      height: '94%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    subTitle: {
      color: theme.palette.text.secondary,
      marginBottom: '40px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    list: {
      marginTop: 0,
      marginBottom: '16px',
      maxWidth: '700px',
    },
    bold: {
      fontWeight: 600,
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
    },
  };
};

export const useInvestmentPreferencesStepStyles = () => {
  return {
    root: {
      '& h4': {
        fontWeight: 600,
      },
      height: '94%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: '12px',
    },
    subTitle: {
      color: theme.palette.text.secondary,
      marginBottom: '40px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      maxWidth: '600px',
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
    },
  };
};
