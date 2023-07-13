import theme from '@/config/theme';

export const useDefaultLayoutStyles = () => {
  return {
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  };
};

export const useEntryLayoutStyles = () => {
  return {
    root: {
      minHeight: '100vh',
      display: 'flex',
    },
    leftPartWrapper: {
      padding: '24px 0px 24px 24px',
      width: '35%',
    },
    leftPartContent: {
      backgroundImage: 'url(/assets/signUpBanner.jpg)',
      height: '100%',
      borderRadius: '24px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      padding: '64px 64px 120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    textContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      color: theme.palette.common.white,
      '& h1': {
        fontWeight: 600,
      },
    },
    rightPartWrapper: {
      width: '65%',
      display: 'flex',
      flexdirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};
