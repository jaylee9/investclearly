import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useSavedDealsStyles = () => {
  return {
    root: {
      padding: '24px',
    },
    dealsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    dealCard: {
      boxShadow: customShadows.base,
    },
    searchInput: {
      marginBottom: '24px',
      maxWidth: '320px',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      padding: '8px 0px',
      '& span': {
        color: palette.text.secondary,
      },
    },
  };
};

export const useSavedSponsorsStyles = () => {
  return {
    root: {
      padding: '24px',
    },
    sponsorsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    sponsorCard: {
      boxShadow: customShadows.base,
    },
    searchInput: {
      marginBottom: '24px',
      maxWidth: '320px',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      padding: '8px 0px',
      '& span': {
        color: palette.text.secondary,
      },
    },
  };
};
