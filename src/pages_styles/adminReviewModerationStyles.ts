import theme from '@/config/theme';

const { palette } = theme;

const useAdminReviewModerationStyles = () => {
  return {
    title: {
      fontWeight: 600,
      marginBottom: '20px',
    },
    header: {
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      background: palette.common.white,
    },
    searchInput: {
      width: '320px',
    },
    noReviewsContent: {
      borderRadius: '12px',
      background: palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '80vh',
      gap: '4px',
      paddingTop: '80px',
      '& h4': {
        fontWeight: 600,
      },
      '& p': {
        color: palette.text.secondary,
        maxWidth: '480px',
      },
    },
    sponsorMainInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    sponsorImage: {
      borderRadius: '1320px',
    },
    ellipsisText: {
      maxWidth: '180px',
    },
    subTitle: {
      color: palette.text.secondary,
    },
    activelyRisingWrapper: {
      '& .activelyRising': {
        color: palette.success.main,
      },
      '& .notActivelyRising': {
        color: palette.text.secondary,
      },
    },
    editIcon: {
      color: palette.text.secondary,
      fontSize: '24px',
    },
    selectWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      '& p': {
        color: palette.text.secondary,
      },
    },
    selectContent: {
      width: '200px',
    },
  };
};

export default useAdminReviewModerationStyles;
