import theme from '@/config/theme';

const { palette } = theme;

export const useProfileReviewsStyles = () => {
  return {
    root: {},
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
  };
};
