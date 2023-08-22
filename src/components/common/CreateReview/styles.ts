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
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
    },
    noResults: {
      color: palette.text.secondary,
    },
    sponsorVariantWrapper: {
      display: 'flex',
      gap: '12px',
      cursor: 'pointer',
    },
    tagSelectorWrapper: {
      width: '520px',
    },
    tagSelectorContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    sponsorRating: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      marginBottom: '6px',
      '& .icon-Star': {
        fontSize: '12px',
        color: theme.palette.secondary.main,
      },
      color: theme.palette.secondary.main,
      fontWeight: 600,
      '& span': {
        '&:last-child': {
          color: theme.palette.text.secondary,
          fontWeight: 400,
        },
      },
    },
    address: {
      color: palette.text.secondary,
    },
  };
};

export const useChooseDealStepStyles = () => {
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
      color: palette.text.secondary,
      textAlign: 'center',
      maxWidth: '520px',
      marginBottom: '24px',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      gap: '8px',
    },
    noResults: {
      color: palette.text.secondary,
    },
    dealVariantWrapper: {
      display: 'flex',
      gap: '12px',
      cursor: 'pointer',
    },
    tagSelectorWrapper: {
      width: '520px',
    },
    tagSelectorContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    address: {
      color: palette.text.secondary,
    },
    assetClassesWrapper: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
    },
  };
};
