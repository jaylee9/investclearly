import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useDeactivateAccountModalStyles = () => {
  return {
    root: {
      maxWidth: '530px',
    },
    title: {
      fontWeight: 600,
      marginBottom: '4px',
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
      '& button': {
        width: '50%',
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '520px',
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
      padding: '16px 24px',
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
      '& p': {
        fontWeight: 600,
      },
    },
    content: {
      paddingTop: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formWrapper: {
      width: '700px',
      background: palette.common.white,
      borderRadius: '12px',
      boxShadow: customShadows.header,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0px 40px',
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
    changedTitle: {
      fontWeight: 600,
      marginBottom: '8px',
    },
    changedSubTitle: {
      marginBottom: '40px',
      color: palette.text.secondary,
    },
    successWrapper: {
      textAlign: 'center',
    },
  };
};
