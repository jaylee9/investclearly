import theme from '@/config/theme';

const { palette, typography } = theme;

const useOnboardingPageStyles = () => {
  return {
    wrapper: {
      width: '100%',
      paddingRight: { md: '14px', lg: '0px' },
    },
    title: {
      fontWeight: 600,
      fontSize: { xs: typography.h3.fontSize, lg: typography.h2.fontSize },
    },
    form: {
      width: '100%',
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: { xs: '40px', lg: '48px' },
    },
    buttonsWrapper: {
      width: { md: '103%' },
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      gap: '8px',
    },
  };
};

export default useOnboardingPageStyles;
