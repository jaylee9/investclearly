import theme from '@/config/theme';

const { palette } = theme;

export const useInvestmentsStyles = () => {
  return {
    root: {
      width: '100%',
      padding: { xs: '0px 16px', lg: '0px 24px' },
    },
    totalInvest: {
      padding: { xs: '24px 16px', lg: '24px 0px' },
      background: palette.common.white,
      borderRadius: { xs: '0px', md: '12px' },
      marginBottom: { xs: '16px', lg: '0px' },
    },
    title: {
      marginBottom: '4px',
      color: palette.text.disabled,
    },
    totalInvested: {
      fontWeight: 600,
    },
    dealName: {
      maxWidth: '260px',
      margin: 0,
    },
    editIcon: {
      fontSize: '24px',
      padding: '8px',
      color: palette.text.secondary,
    },
    deleteIcon: {
      fontSize: '24px',
      padding: '8px',
      color: palette.error.light,
    },
    dealWrapper: {
      background: palette.common.white,
      borderRadius: { xs: '0px', md: '12px' },
      paddingBottom: { xs: '10px', lg: '0px' },
    },
    tableWrapperHeader: {
      display: { xs: 'block', md: 'flex' },
      justifyContent: 'space-between',
      alignItems: { xs: 'flex-start', md: 'center' },
      flexDirection: { xs: 'column', md: 'row' },
      padding: { xs: '15px 16px', lg: '15px 0px' },
      '& h5': {
        fontWeight: 600,
        marginBottom: { xs: '16px', md: '0px' },
      },
    },
    searchWrapper: {
      display: { xs: 'block', md: 'flex' },
      gap: { xs: '0px', md: '8px' },
      alignItems: { xs: 'flex-start', md: 'center' },
      flexDirection: { xs: 'column', md: 'row' },
    },
    noDeals: {
      background: palette.common.white,
      borderRadius: { xs: '0px', md: '12px' },
      padding: { xs: '0px 16px', lg: '0px 24px' },
    },
    noDealsTitle: {
      fontWeight: 600,
      marginBottom: '16px',
    },
    noDealsSubTitle: {
      color: palette.text.secondary,
      marginBottom: '12px',
    },
    contactUsWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '24px 16px',
      background: palette.primary.contrastText,
      border: `1px solid ${palette.background.paper}`,
      borderRadius: { xs: '0px', md: '12px' },
      alignItems: { xs: 'normal', md: 'flex-start', lg: 'center' },
    },
    buttonContact: {
      width: '100%',
    },
    buttonSearchDeals: {
      width: { xs: '100%', md: 'auto' },
    },
    input: {
      marginBottom: '8px',
    },
    divider: {
      display: { xs: 'none', lg: 'block' },
    },
  };
};
