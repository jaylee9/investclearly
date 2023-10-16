import theme from '@/config/theme';

const { palette, customShadows } = theme;

export const useListStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .MuiTabs-root': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTabs-scroller': {
          maxWidth: '1216px',
        },
      },
    },
  };
};

const useDealsPageStyles = () => {
  return {
    root: {
      display: 'flex',
      gap: '16px',
    },
    leftColumn: {
      flex: '25%',
      background: palette.common.white,
      borderRadius: '12px',
      boxShadow: customShadows.header,
      '& .MuiPaper-root': {
        '&:first-of-type': {
          borderRadius: '100px 100px 0px 0px !important',
        },
      },
    },
    leftColumnHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 16px 16px',
      borderBottom: `1px solid ${palette.background.paper}`,
      '& h5': {
        fontWeight: 600,
      },
      '& p': {
        fontWeight: 600,
        color: palette.primary.light,
        cursor: 'pointer',
      },
    },
    rightColumn: {
      flex: '75%',
    },
    rightColumnHeader: {
      background: palette.common.white,
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '12px',
      '& p': {
        color: palette.text.secondary,
      },
      marginBottom: '16px',
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
    dealsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '16px',
    },
    paggination: {
      display: 'flex',
      padding: '8px 24px',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: palette.common.white,
      borderRadius: '12px',
      '& span': {
        color: palette.text.secondary,
      },
    },
  };
};

export default useDealsPageStyles;
