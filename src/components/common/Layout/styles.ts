import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useDefaultLayoutStyles = () => {
  return {
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  };
};

export const useEntryLayoutStyles = (isEntrySpacing: boolean) => {
  return {
    root: {
      minHeight: '100vh',
      background: palette.common.white,
    },
    container: {
      height: { xl: '100vh' },
    },
    leftPartWrapper: {
      padding: { xs: '0px', xl: '24px 0px 24px 24px' },
      height: { xs: '152px', md: '196px', xl: '100%' },
    },
    leftPartContent: {
      backgroundImage: 'url(/assets/signUpBanner.jpg)',
      height: '100%',
      borderRadius: { xs: '0px', xl: '24px' },
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      padding: { xs: '0px 0px 24px', xl: '64px 64px 120px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: { xs: 'center', xl: 'space-between' },
      alignItems: { xs: 'center', xl: 'flex-start' },
    },
    textContent: {
      display: { xs: 'none', xl: 'flex' },
      flexDirection: 'column',
      gap: '16px',
      color: theme.palette.common.white,
      '& h1': {
        fontWeight: 600,
      },
    },
    rightContainer: {
      borderRadius: { xs: '24px 24px 0px 0px', xl: '0px' },
      marginTop: { xs: '-24px', xl: '0px' },
      background: palette.common.white,
    },
    rightPartWrapper: {
      display: 'flex',
      flexdirection: 'column',
      justifyContent: isEntrySpacing ? 'normal' : 'center',
      paddingTop: { xs: '56px', md: '120px', xl: '135px' },
      padding: isEntrySpacing ? '135px 65px 24px' : '125px 16px 24px',
    },
  };
};

export const useAdminLayoutStyles = () => {
  return {
    root: {
      display: 'flex',
    },
    sideBar: {
      minHeight: '100vh',
      background: palette.common.white,
      boxShadow: customShadows.header,
      borderRight: `1px solid ${palette.background.default}`,
    },
    logoWrapper: {
      padding: '24px 56px 24px 24px',
      marginBottom: '12px',
    },
    linksWrapper: {
      padding: '0px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      '& .defaultLink': {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        color: palette.text.secondary,
        fontWeight: 600,
        borderRadius: '8px',
        '& i': {
          fontSize: '24px',
        },
      },
      '& .activeLink': {
        color: palette.primary.light,
        background: palette.primary.contrastText,
      },
    },
    headerWithContentWrapper: {
      width: '100%',
    },
    header: {
      width: '100%',
      background: palette.common.white,
      boxShadow: customShadows.header,
      display: 'flex',
      justifyContent: 'end',
      padding: '16px 24px',
      '& .logoutLink': {
        color: palette.primary.light,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        '& i': {
          fontSize: '24px',
        },
      },
    },
    children: {
      padding: '24px',
    },
  };
};
