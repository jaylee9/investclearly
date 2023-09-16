import theme from '@/config/theme';

const useTermsConditionPageStyles = () => {
  const { palette, customShadows } = theme;
  return {
    root: {
      padding: { xs: '16px', lg: '32px 0px' },
      display: 'flex',
      justifyContent: 'center',
    },
    wrapper: {
      padding: '40px',
      boxShadow: customShadows.header,
      borderRadius: '12px',
      maxWidth: '800px',
      background: palette.common.white,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    mainTitle: {
      fontWeight: 600,
      marginBottom: '8px',
    },
    lastUpdate: {
      color: palette.text.disabled,
      marginBottom: '16px',
      display: 'block',
    },
    text: {
      color: palette.text.secondary,
    },
    blockTitle: {
      fontWeight: 600,
      marginBottom: '8px',
    },
    mainInfoWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      '& h5': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
  };
};

export default useTermsConditionPageStyles;
