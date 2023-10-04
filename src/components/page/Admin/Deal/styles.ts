import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useEditDealModalStyles = () => {
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
      '& span': {
        color: palette.text.secondary,
      },
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0px 32px',
      gap: '32px',
      flex: 1,
      minHeight: '90%',
    },
    content: {
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: customShadows.header,
      padding: '40px 40px 16px',
      width: '790px',
      flex: 1,
    },
    title: {
      fontWeight: 600,
      marginBottom: '32px',
    },
  };
};

export const useGeneralInfoFormStyles = () => {
  return {
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '40px',
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
    doubleInputsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      '& > div': {
        width: '50% !important',
      },
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      paddingTop: '16px',
      gap: '8px',
    },
  };
};

export const useFinancialMetricsFormStyles = () => {
  return {
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    doubleInputsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      '& > div': {
        width: '50% !important',
      },
    },
    symbol: {
      color: palette.text.disabled,
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      paddingTop: '16px',
      gap: '8px',
    },
  };
};
