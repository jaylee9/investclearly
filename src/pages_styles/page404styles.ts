import theme from '@/config/theme';

const usePage404Styles = () => {
  const { palette } = theme;
  return {
    root: {
      padding: { xs: '150px 16px', md: '200px 137px 264px', lg: '220px 120px' },
      gap: { xs: '55px', lg: '123px' },
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    order: {
      order: { xs: 1, lg: 0 },
      display: { xs: 'flex', lg: 'block' },
      flexDirection: { xs: 'column', lg: 'unset' },
      alignItems: { xs: 'center', lg: 'unset' },
    },
    blueTitle: {
      fontWeight: 600,
      color: palette.primary.light,
      marginBottom: '8px',
    },
    title: {
      fontWeight: 600,
      marginBottom: '12px',
      textAlign: { xs: 'center', lg: 'left' },
    },
    info: {
      maxWidth: '500px',
      color: palette.text.secondary,
      marginBottom: '24px',
      textAlign: { xs: 'center', lg: 'left' },
    },
  };
};

export default usePage404Styles;
