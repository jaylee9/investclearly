import theme from '@/config/theme';

const usePublicUserPageStyles = () => {
  const { palette } = theme;
  return {
    root: {
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: '16px',
      padding: { xs: '0', md: '16px', lg: '32px 48px' },
    },
    userInfo: {
      width: { xs: '100%', lg: '25%' },
      padding: { xs: '24px 16px', lg: '24px 28px' },
      display: 'flex',
      flexDirection: 'column',
      background: palette.common.white,
      gap: '12px',
      borderRadius: '12px',
      alignItems: 'center',
      maxHeight: '176px',
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: { xs: '100%', lg: '75%' },
    },
    rightColumnBlock: {
      padding: { xs: '24px 16px', md: '40px 16px', lg: '40px' },
      borderRadius: '12px',
      background: palette.common.white,
      '& h3': {
        fontWeight: 600,
      },
    },
    rightColumnBlockHeader: {
      display: 'flex',
      gap: '8px',
      '& h3': {
        fontWeight: 600,
      },
      '& p': {
        padding: '4px 8px',
        background: palette.background.default,
        borderRadius: '20px',
        color: palette.text.secondary,
      },
    },
    dealsBlockContent: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    dealCard: {
      width: { xs: '100%', md: 'calc((100% - 24px) / 3)' },
      '& h5': {
        maxWidth: '340px',
      },
    },
    reviewsBlockContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px',
    },
    showMoreLink: {
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

export default usePublicUserPageStyles;
