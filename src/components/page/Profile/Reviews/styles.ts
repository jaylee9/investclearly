import theme from '@/config/theme';

const { palette } = theme;

export const useProfileReviewsStyles = () => {
  return {
    content: {
      padding: '24px 0px',
    },
    searchInput: {
      maxWidth: '320px',
    },
    warning: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: palette.error.light,
      padding: '8px',
      borderRadius: '36px',
      background: palette.error.contrastText,
      width: '100%',
      '& i': {
        fontSize: '24px',
      },
    },
    reviewsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '24px 0px',
    },
    showMore: {
      cursor: 'pointer',
      color: palette.primary.light,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 600,
      gap: '8px',
      '& i': {
        fontSize: '24px',
      },
    },
    noContentWrapper: {
      paddingTop: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    noReviewTitle: {
      fontWeight: 600,
      marginBottom: '4px',
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
    writeReviewButton: {
      minWidth: '240px',
    },
  };
};
