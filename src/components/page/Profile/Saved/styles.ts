import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useSavedDealsStyles = () => {
  return {
    wrapper: {
      padding: { xs: '0px 16px', lg: '0px 24px' },
    },
    root: {
      padding: { xs: '16px', lg: '24px' },
      background: palette.common.white,
      minHeight: { xs: '80vh', md: '65vh', lg: 'initial' },
      borderRadius: { xs: '12px', lg: '0px' },
    },
    noDealsRoot: {
      paddingTop: { xs: '40px', md: '80px' },
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: { xs: '12px', lg: '0px' },
      textAlign: 'center',
      '& p': {
        color: palette.text.secondary,
      },
    },
    dealsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '16px',
    },
    dealCard: {
      boxShadow: customShadows.base,
    },
    searchInput: {
      marginBottom: '24px',
      maxWidth: { xs: 'initial', lg: '320px' },
    },
    pagination: {
      display: 'flex',
      justifyContent: { xs: 'center', md: 'space-between' },
      width: '100%',
      alignItems: 'center',
      padding: '8px 0px',
      '& span': {
        color: palette.text.secondary,
      },
      '& .MuiPagination-root': {
        margin: '0px',
      },
    },
    paginationResults: {
      display: { xs: 'none', md: 'block' },
    },
  };
};

export const useSavedSponsorsStyles = () => {
  return {
    root: {
      padding: { xs: '16px', lg: '24px' },
      background: palette.common.white,
      minHeight: { xs: '80vh', md: '65vh', lg: 'initial' },
      borderRadius: { xs: '12px', lg: '0px' },
    },
    sponsorsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '16px',
    },
    sponsorCard: {
      boxShadow: customShadows.base,
    },
    searchInput: {
      marginBottom: '24px',
      maxWidth: { xs: 'initial', lg: '320px' },
    },
    pagination: {
      display: 'flex',
      justifyContent: { xs: 'center', md: 'space-between' },
      width: '100%',
      alignItems: 'center',
      padding: '8px 0px',
      '& span': {
        color: palette.text.secondary,
      },
      '& .MuiPagination-root': {
        margin: '0px',
      },
    },
    paginationResults: {
      display: { xs: 'none', md: 'block' },
    },
    noSponsorsRoot: {
      paddingTop: { xs: '40px', md: '80px' },
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: { xs: '12px', lg: '0px' },
      textAlign: 'center',
      '& p': {
        color: palette.text.secondary,
      },
    },
  };
};
