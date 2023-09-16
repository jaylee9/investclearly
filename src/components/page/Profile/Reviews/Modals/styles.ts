import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useDeleteReviewModalStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    buttonsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      '& button': {
        width: '250px',
      },
    },
  };
};

export const useVerifyReviewModalStyles = () => {
  return {
    root: {
      width: '100vw',
      height: '100vh',
      background: palette.common.white,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
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
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0px 32px',
      flex: 1,
      '& .content': {
        borderRadius: '12px',
        background: palette.common.white,
        boxShadow: customShadows.header,
        padding: '40px 40px 16px',
      },
      '& .stretched-content': {
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    },
    title: {
      fontWeight: 600,
      marginBottom: '4px',
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '32px',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'end',
    },
    submittedReviewTitle: {
      fontWeight: 600,
      marginBottom: '4px',
    },
    submittedReviewSubTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    submittedReviewContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };
};
