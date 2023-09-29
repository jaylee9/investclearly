import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useCreateReviewFormStyles = () => {
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
    subTitle: {
      color: palette.text.secondary,
      maxWidth: { xs: '200px' },
      display: 'block',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    logoBox: {
      display: { xs: 'none', lg: 'block' },
      marginRight: '32px',
    },
    buttonBack: {
      display: { xs: 'flex', md: 'none' },
      width: '24px',
    },
    iconBack: {
      fontSize: '24px',
    },
    titleBox: {
      width: { xs: 'auto', md: '100%' },
      textAlign: { xs: 'center', md: 'left' },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: { xs: '32px 16px 0px', md: '32px 16px 0px' },
      gap: '32px',
      height: '100%',
    },
  };
};

export const useChooseSponsorStepStyles = () => {
  return {
    root: {
      paddingBottom: { xs: '0px', md: '16px' },
      maxWidth: '796px',
      width: '100%',
      height: { xs: '100%', md: 'auto' },
    },
    container: {
      height: '100%',
      width: '100%',
      padding: { xs: '64px 0px 0px', md: '64px 32px 0px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: { xs: '0px', md: '64px' },
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: { xs: 'none', md: customShadows.header },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    contactUsWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      paddingTop: { xs: '16px', md: '32px' },
    },
    contactUsContent: {
      maxWidth: '520px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '24px 16px',
      background: palette.primary.contrastText,
      border: `1px solid ${palette.background.paper}`,
      borderRadius: { xs: '0px', md: '12px' },
      alignItems: 'center',
    },
    buttonContact: {
      width: '100%',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      paddingBottom: '16px',
    },
    buttonNext: {
      width: { xs: '100%', md: 'auto' },
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
      maxWidth: '520px',
      width: '100%',
      marginBottom: { xs: '24px', md: '0px' },
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
      paddingBottom: { xs: '0px', md: '16px' },
      maxWidth: '796px',
      width: '100%',
      height: { xs: '100%', md: 'auto' },
    },
    container: {
      height: '100%',
      width: '100%',
      padding: { xs: '64px 0px 0px', md: '64px 32px 0px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: { xs: '0px', md: '64px' },
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: { xs: 'none', md: customShadows.header },
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
      justifyContent: 'space-between',
    },
    mainButtonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      gap: '8px',
      flexDirection: { xs: 'column', md: 'row' },
      paddingBottom: '16px',
      width: '100%',
    },
    buttonBack: {
      display: { xs: 'none', md: 'block' },
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
      maxWidth: '520px',
      width: '100%',
      marginBottom: { xs: '24px', md: '0px' },
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
      paddingBottom: { xs: '0px', md: '16px' },
      maxWidth: '796px',
      width: '100%',
      height: { xs: '100%', md: 'auto' },
    },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: { xs: 'none', md: customShadows.header },
      padding: {
        xs: '24px 0px 0px',
        md: '24px 16px 0px',
        lg: '40px 40px 0px',
      },
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
      height: '100%',
    },
    formContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    formContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    titleInput: {
      maxWidth: '796px',
      width: '100%',
    },
    ratingField: {
      marginBottom: '12px',
    },
    overallRatingField: {
      marginBottom: '16px',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '16px',
    },
    buttonBack: {
      display: { xs: 'none', md: 'block' },
    },
    buttonNext: {
      width: { xs: '100%', md: 'auto' },
    },
  };
};

export const useUploadProofStepStyles = () => {
  return {
    root: {
      paddingBottom: { xs: '0px', md: '16px' },
      maxWidth: '796px',
      width: '100%',
      height: { xs: '100%', md: 'auto' },
    },
    container: {
      height: '100%',
      width: '100%',
      padding: { xs: '64px 0px 0px', md: '64px 32px 0px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: { xs: '0px', md: '64px' },
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: { xs: 'none', md: customShadows.header },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    titleBox: {
      width: '100%',
    },
    subTitle: {
      color: palette.text.secondary,
      margin: '4px 0px 32px',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    mainButtonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      gap: '8px',
      flexDirection: { xs: 'column', md: 'row' },
      paddingBottom: '16px',
      width: '100%',
    },
    buttonBack: {
      display: { xs: 'none', md: 'block' },
    },
  };
};

export const useReviewSubmittedStyles = () => {
  return {
    root: {
      paddingBottom: { xs: '0px', md: '16px' },
      maxWidth: '796px',
      width: '100%',
      height: { xs: '100%', md: 'auto' },
    },
    container: {
      height: '100%',
      width: '100%',
      padding: { xs: '64px 0px 0px', md: '64px 32px 0px' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: { xs: 'flex-start', md: 'center' },
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: { xs: 'none', md: customShadows.header },
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    buttonsWrapper: {
      width: { xs: '100%', md: 'auto' },
      display: 'flex',
      flexDirection: { xs: 'column-reverse', md: 'row' },
      justifyContent: 'space-between',
      gap: '8px',
      paddingBottom: '16px',
    },
    link: {
      width: '100%',
    },
  };
};
