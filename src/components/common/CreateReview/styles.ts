import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useCreateReviewFormStyles = () => {
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0px 32px',
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

export const useReviewDetailsStepStyles = () => {
  return {
    root: {
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: customShadows.header,
      padding: '40px 40px 16px',
      '& .add-comment': {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        fontWeight: 600,
        '& .icon-Plus': {
          fontSize: '24px',
        },
      },
      '& .add-comment-disabled': {
        color: palette.text.disabled,
        cursor: 'default',
        transition: 'color 0.3s ease',
      },
      '& .add-comment-active': {
        cursor: 'pointer !important',
        color: palette.primary.light,
        transition: 'color 0.3s ease',
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    titleInput: { minWidth: '700px' },
    ratingField: {
      marginBottom: '12px',
    },
    overallRatingField: {
      marginBottom: '16px',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'end',
    },
  };
};

export const useUploadProofStepStyles = () => {
  return {
    root: {
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: customShadows.header,
      padding: '40px 40px 16px',
    },
    subTitle: {
      color: palette.text.secondary,
      margin: '4px 0px 32px',
    },
    content: {
      paddingBottom: '40px',
      marginBottom: '100px',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    mainButtonsWrapper: {
      display: 'flex',
      gap: '8px',
    },
  };
};
