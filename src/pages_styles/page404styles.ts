import theme from '@/config/theme';

const usePage404Styles = () => {
  const { palette } = theme;
  return {
    root: {
      padding: '0px 120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '65vh',
    },
    blueTitle: {
      fontWeight: 600,
      color: palette.primary.light,
      marginBottom: '8px',
    },
    title: {
      fontWeight: 600,
      marginBottom: '12px',
    },
    info: {
      maxWidth: '500px',
      color: palette.text.secondary,
      marginBottom: '24px',
    },
  };
};

export default usePage404Styles;
