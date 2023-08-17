import theme from '@/config/theme';

const useDealPageStyles = () => {
  const { palette } = theme;
  return {
    root: {
      padding: '0px 48px 32px',
      display: 'flex',
      gap: '16px',
    },
    imageWrapper: {
      marginBottom: '40px',
      padding: '0px 48px',
      '& img': {
        width: '100%',
        objectFit: 'cover',
      },
      '& span': {
        width: '100% !important',
      },
    },
    leftColumn: {
      width: '78%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    rightColumn: {
      width: '22%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    info: {
      width: '100%',
      background: palette.common.white,
      padding: '40px 40px 0px',
      borderRadius: '12px',
    },
    infoHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
      '& p': {
        color: palette.text.secondary,
      },
      '& .icon-Saved': {
        fontSize: '24px',
        color: palette.text.secondary,
        cursor: 'pointer',
      },
    },
    infoContent: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '70%',
      marginBottom: '24px',
    },
    infoContentColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    infoContentDetail: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      '& i': {
        fontSize: '24px',
        color: palette.primary.light,
      },
      '& span': {
        color: palette.text.disabled,
        marginBottom: '4px',
      },
      '& p': {
        fontWeight: 500,
      },
    },
    overview: {
      padding: '40px',
      background: palette.common.white,
      borderRadius: '12px',
    },
    overviewHeader: {
      '& h3': {
        fontWeight: 600,
        marginBottom: '12px',
      },
      '& p': {
        color: palette.text.secondary,
      },
      marginBottom: '32px',
    },
    overviewContent: {
      '& h5': {
        fontWeight: 600,
      },
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    overviewDetails: {
      width: '70%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    overviewDetailsColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      '& span': {
        color: palette.text.disabled,
        marginBottom: '4px',
      },
      '& p': {
        fontWeight: 500,
      },
    },
    textWithButton: {
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: palette.primary.contrastText,
      borderRadius: '12px',
      border: `1px solid ${palette.background.paper}`,
      '& p': {
        fontWeight: 600,
      },
    },
    sponsor: {
      padding: '24px 28px',
      display: 'flex',
      gap: '16px',
      background: palette.common.white,
      borderRadius: '12px',
      '& img': {
        borderRadius: '12px',
      },
      '& h5': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
    sponsorInfo: {
      padding: '24px 28px',
      background: palette.common.white,
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      '& span': {
        color: palette.text.disabled,
      },
      '& p': {
        fontWeight: 500,
      },
    },
    sponsorInfoRow: {
      display: 'flex',
      gap: '16px',
    },
    sponsorRating: {
      color: palette.secondary.main,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontWeight: 600,
      '& .icon-Star': {
        fontSize: '16px',
      },
      '& span': {
        fontWeight: 400,
        color: palette.text.secondary,
      },
    },
    reviewsWrapper: {
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: palette.common.white,
      borderRadius: '12px',
    },
    reviewsWrapperHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reviewsWrapperTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      '& h3': {
        fontWeight: 600,
      },
      '& p': {
        padding: '2px 8px',
        background: palette.background.default,
        borderRadius: '20px',
        color: palette.text.secondary,
      },
    },
    reviewsContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px',
    },
    showMoreReviews: {
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

export default useDealPageStyles;
