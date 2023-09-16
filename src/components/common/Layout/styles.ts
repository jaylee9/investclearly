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
      display: 'flex',
      background: palette.common.white,
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
      justifyContent: isEntrySpacing ? 'normal' : 'center',
      paddingTop: '135px',
      padding: isEntrySpacing ? '135px 65px 0px' : '125px 0px',
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
