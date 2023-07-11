import theme from '@/config/theme';

const getStyles = () => {
  return {
    root: {
      background: theme.palette.common.black,
      padding: '64px 48px 16px',
      marginTop: 'auto',
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '80px',
    },
    linksWrapper: {
      display: 'flex',
      gap: '32px',
      color: theme.palette.common.white,
    },
    rights: {
      textAlign: 'center',
      fontSize: theme.typography.caption,
      color: theme.palette.text.disabled,
    },
  };
};

export default getStyles;
