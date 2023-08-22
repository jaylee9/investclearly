import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useCreateReviewFormStyles = () => {
  return {
    root: {
      width: '100vw',
      height: '100vh',
      background: palette.common.white,
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '32px',
      gap: '32px',
    },
  };
};

export const useChooseSponsorStepStyles = () => {
  return {
    root: {
      padding: '64px 32px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: customShadows.header,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    subTitle: {
      textAlign: 'center',
      maxWidth: '500px',
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      gap: '8px',
    },
  };
};
