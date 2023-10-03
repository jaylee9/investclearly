import theme from '@/config/theme';

const { palette } = theme;

export const useProfileReviewsStyles = () => {
  return {
    wrapper: {
      padding: { xs: '0px 16px', lg: '0px 24px' },
    },
    content: {
      padding: { lg: '24px 0px', xs: '24px 16px' },
      borderRadius: { xs: '12px', lg: '0px' },
      background: palette.common.white,
    },
    warning: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: palette.primary.light,
      padding: '8px',
      borderRadius: { xs: '8px', md: '36px' },
      background: palette.primary.contrastText,
      width: '100%',
      fontWeight: 600,
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
      padding: { lg: '80px 0px', xs: '80px 16px' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: palette.common.white,
      borderRadius: '8px',
      minHeight: { xs: '78vh', md: '65vh', lg: 'initial' },
    },
    noReviewTitle: {
      fontWeight: 600,
      marginBottom: '4px',
      textAlign: 'center',
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
      textAlign: 'center',
    },
    writeReviewButton: {
      minWidth: '240px',
    },
    pagination: {
      display: 'flex',
      justifyContent: { xs: 'center', md: 'space-between' },
      width: '100%',
      alignItems: 'center',
      padding: '8px 0px',
      '& span': {
        color: palette.text.secondary,
      },
      '& .MuiPagination-root': {
        margin: '0px',
      },
    },
    paginationResults: {
      display: { xs: 'none', md: 'block' },
    },
  };
};
