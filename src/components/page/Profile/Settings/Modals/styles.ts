import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useDeactivateAccountModalStyles = () => {
  return {
    root: {
      width: { md: '530px' },
    },
    title: {
      fontWeight: 600,
      marginBottom: '4px',
      paddingTop: { xs: '16px', md: 0 },
      textAlign: 'center',
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    textAreaTitle: {
      fontWeight: 600,
      marginBottom: '4px',
    },
    textAreaWrapper: {
      marginBottom: '12px',
    },
    buttonsWrapper: {
      display: 'flex',
      gap: '12px',
      flexDirection: { xs: 'column-reverse', md: 'row' },
      '& button': {
        width: { xs: '100%', md: '50%' },
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: { xs: 'center', md: 'start' },
      height: { xs: '55vh', md: 'auto' },
      width: { md: '530px' },
    },
    iconWrapper: {
      borderRadius: '40px',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${palette.primary.light}`,
      marginBottom: '12px',
      '& i': {
        color: palette.primary.light,
        fontSize: '24px',
      },
    },
    deletedSubTitle: {
      color: palette.text.secondary,
    },
  };
};

export const usePasswordModalsWrapperStyles = () => {
  return {
    root: {
      width: '100vw',
      height: '100vh',
      background: palette.common.white,
      overflow: 'auto',
    },
    header: {
      padding: { xs: '12px', md: '16px 24px' },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${palette.background.default}`,
      boxShadow: customShadows.header,
      '& .icon-Cross': {
        cursor: 'pointer',
        fontSize: '24px',
        color: palette.text.secondary,
      },
    },
    leftPart: {
      display: 'flex',
      gap: '32px',
      alignItems: 'center',
      flex: { xs: 1, md: 'initial' },
      '& p': {
        fontWeight: 600,
      },
      '& a': {
        display: { xs: 'none', lg: 'block' },
      },
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: { xs: 'center', md: 'start' },
      flex: { xs: 1, md: 'initial' },
    },
    content: {
      paddingTop: { xs: '24px', md: '32px' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formWrapper: {
      width: '700px',
      background: { xs: 'transparent', md: palette.common.white },
      borderRadius: '12px',
      boxShadow: { md: customShadows.header },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: { md: '40px 0px 40px' },
    },
    title: {
      fontSize: '20px',
      marginBottom: '40px',
      fontWeight: 600,
    },
  };
};

export const useActionPasswordStyles = () => {
  return {
    inputsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      marginBottom: '32px',
    },
    link: {
      fontWeight: 600,
      color: palette.primary.light,
    },
    changedWrapper: {
      padding: { xs: '0px 16px', md: '0px' },
    },
    changedTitle: {
      fontWeight: 600,
      marginBottom: '8px',
      paddingTop: { xs: '106px', md: '0px' },
      textAlign: 'center',
    },
    changedSubTitle: {
      marginBottom: '40px',
      color: palette.text.secondary,
      textAlign: 'center',
    },
    successWrapper: {
      textAlign: 'center',
    },
  };
};
