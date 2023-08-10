import theme from '@/config/theme';

const useDealPageStyles = () => {
  const { palette } = theme;
  return {
    root: {
      padding: '32px 48px',
      display: 'flex',
      gap: '16px',
    },
    leftColumn: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    rightColumn: {
      width: '30%',
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
  };
};

export default useDealPageStyles;
