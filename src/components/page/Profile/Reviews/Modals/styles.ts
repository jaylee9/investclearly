import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useDeleteReviewModalStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: { xs: '100%', md: 'initial' },
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
      flexDirection: { xs: 'column-reverse', md: 'row' },
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
      padding: { sm: '12px', md: '16px 24px' },
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
    reviewerName: {
      color: palette.text.secondary,
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: { xs: '24px 16px 0px', md: '32px 16px', lg: '32px 0px' },
      gap: '32px',
      flex: 1,
      '& .content': {
        borderRadius: '12px',
        height: { xs: '100%', md: 'initial' },
        background: { md: palette.common.white },
        boxShadow: { md: customShadows.header },
        padding: {
          xs: '24px 16px',
          md: '24px 24px 16px',
          lg: '40px 40px 16px',
        },
      },
      '& .stretched-content': {
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: { lg: '790px' },
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
      justifyContent: { xs: 'center', md: 'end' },
      '& button': {
        width: { xs: '100%', md: 'fit-content' },
      },
    },
    submittedReviewTitle: {
      fontWeight: 600,
      marginBottom: '4px',
      textAlign: { xs: 'center', md: 'start' },
    },
    submittedReviewSubTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    submittedReviewContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: { xs: '100%', md: '260px' },
      width: { md: '710px', lg: '790px' },
    },
  };
};
