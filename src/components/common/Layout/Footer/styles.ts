import theme from '@/config/theme';

const getStyles = () => {
  return {
    root: {
      background: theme.palette.common.black,
      padding: { xs: '64px 16px 16px', lg: '64px 48px 16px' },
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    content: {
      gap: '40px',
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      justifyContent: 'space-between',
      alignItems: { xs: 'flex-start', lg: 'center' },
      marginBottom: { xs: '56px', lg: '64px' },
      maxWidth: '1216px',
      width: '100%',
    },
    linksWrapper: {
      gap: { xs: '16px', lg: '32px' },
      display: 'flex',
      color: theme.palette.common.white,
      flexDirection: { xs: 'column', lg: 'row' },
      '& p': {
        cursor: 'pointer',
      },
      width: { lg: '33%' },
      justifyContent: 'center',
    },
    disclaimer: {
      textAlign: 'center',
      color: theme.palette.text.disabled,
      width: { lg: '33%' },
      fontSize: '8px',
      lineHeight: '20px',
      order: { xs: 3, lg: 'initial' },
    },
    rights: {
      textAlign: 'center',
      fontSize: theme.typography.caption,
      color: theme.palette.text.disabled,
    },
  };
};

export default getStyles;
