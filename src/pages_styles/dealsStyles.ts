import theme from '@/config/theme';

const useDealsPageStyles = () => {
  const { palette, customShadows } = theme;
  return {
    root: {
      display: 'flex',
      gap: '16px',
      padding: '32px 48px',
    },
    leftColumn: {
      flex: '30%',
      background: palette.common.white,
      borderRadius: '12px',
      boxShadow: customShadows.header,
    },
    rightColumn: {
      flex: '70%',
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
    },
  };
};

export default useDealsPageStyles;
