import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useReviewDetailsModalStyles = () => {
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
    subTitle: {
      color: palette.text.secondary,
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'center',
      padding: '32px 0px',
    },
    content: {
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: customShadows.header,
      width: '796px',
    },
    reviewInfo: {
      padding: '40px',
    },
    title: {
      fontWeight: 600,
      marginBottom: '24px',
    },
    mainReviewInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '40px',
    },
    mainReviewInfoRow: {
      display: 'flex',
      gap: '40px',
    },
    mainReviewInfoLabel: {
      width: '120px',
      fontWeight: 600,
    },
    entityInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      '& img': {
        objectFit: 'cover',
        borderRadius: '1230px',
      },
      '& p': {
        fontWeight: 500,
      },
      '& span': {
        color: palette.text.secondary,
      },
    },
    rating: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      '& p': {
        fontWeight: 600,
        color: palette.secondary.main,
        paddingBottom: '1px',
      },
    },
    blockTitle: {
      fontWeight: 600,
    },
    proofsBlock: {
      marginBottom: '40px',
    },
  };
};
