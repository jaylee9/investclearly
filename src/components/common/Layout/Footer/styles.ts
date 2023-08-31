import theme from '@/config/theme';

const getStyles = () => {
  return {
    root: {
      background: theme.palette.common.black,
      padding: {xs: '64px 16px 16px', lg: '64px 48px 16px'},
      marginTop: 'auto',
    },
    content: {
      gap: '40px',
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      justifyContent: 'space-between',
      alignItems: { xs: 'flex-start', lg: 'center' },
      marginBottom: { xs: '56px', lg: '96px' },
    },
    linksWrapper: {
      gap: { xs: '16px', lg: '32px' },
      display: 'flex',
      color: theme.palette.common.white,
      flexDirection: { xs: 'column', lg: 'row' },
    },
    rights: {
      textAlign: 'center',
      fontSize: theme.typography.caption,
      color: theme.palette.text.disabled,
    },
  };
};

export default getStyles;
