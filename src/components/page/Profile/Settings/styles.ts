import theme from '@/config/theme';

const { palette } = theme;

export const buttonsWrapper = {
  display: 'flex',
  justifyContent: 'end',
  padding: { xs: '16px', lg: '16px 0px 0px' },
};

export const useProfileSettingsWrapperStyles = () => {
  return {
    wrapper: {
      height: '90%',
      paddingBottom: '24px',
      '& .MuiTabs-scroller': {
        overflowX: { xs: 'scroll !important', md: 'hidden !important' },
      },
    },
  };
};

export const useEditProfileStyles = () => {
  return {
    root: {
      padding: { xs: '24px 16px 0px', lg: '24px 24px 0px' },
      height: '95%',
      '& .form': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    uploaderWrapper: {
      marginBottom: '12px',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '600px',
      flex: 1,
    },
    doubleInputsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      maxWidth: '560px',
      flexDirection: { xs: 'column', md: 'row' },
      '& > div': {
        width: { md: '50% !important' },
      },
    },
    singleInputsWrapper: {
      maxWidth: '560px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
  };
};

export const useBooleanSettingsStyles = () => {
  return {
    root: {
      padding: { xs: '24px 0px 0px', lg: '24px 24px 0px' },
      height: { xs: '75vh', md: '90%' },
      '& .form': {
        height: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '24px',
      },
      '& .firstCondition': {
        borderBottom: `1px solid ${palette.background.paper}`,
      },
    },
    title: {
      color: palette.text.secondary,
      marginBottom: '24px',
      paddingLeft: { xs: '24px', lg: '0px' },
    },
    header: {
      padding: '8px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      background: palette.background.default,
      color: palette.text.secondary,
      '& .fixedWidth': {
        width: '56px',
      },
    },
    condition: {
      display: 'flex',
      padding: '12px 16px',
      gap: '20px',
    },
    checkboxWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '56px',
    },
  };
};

export const useInvestmentPreferencesStyles = () => {
  return {
    root: {
      padding: { xs: '24px 0px 24px 16px', md: '24px 24px 0px' },
    },
    sectionTitle: {
      fontWeight: 600,
      marginBottom: '24px',
    },
    section: {
      marginBottom: '32px',
      paddingRight: { xs: '16px', md: '0px' },
    },
    description: {
      marginBottom: '16px',
    },
    list: {
      maxWidth: '600px',
    },
    bold: { fontWeight: 600 },
    investmentPreferencesSection: {
      maxWidth: '600px',
      paddingRight: { xs: '16px', md: '0px' },
    },
    multiButtonWrapper: {
      marginBottom: '24px',
    },
    sliderWrapper: {
      marginBottom: '24px',
    },
    sliderTitle: {
      marginBottom: '8px',
      fontWeight: 600,
    },
  };
};

export const useCredentialsSettingsStyles = () => {
  return {
    root: {
      padding: { xs: '24px 16px 0px', md: '24px 24p 0px' },
      maxWidth: '650px',
    },
    title: {
      fontWeight: 600,
      marginBottom: '24px',
    },
    googleWarning: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '36px',
      background: palette.secondary.light,
      marginBottom: '24px',
      '& .icon-Warning': {
        fontSize: '24px',
        color: palette.secondary.main,
      },
    },
    input: {
      marginBottom: '16px',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '32px',
    },
    deactivateButton: {
      width: { xs: '100%', md: '320px' },
    },
    iconWrapper: {},
  };
};
