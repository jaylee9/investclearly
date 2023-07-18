import theme from '@/config/theme';

const useDealsPageStyles = () => {
  const { palette, typography } = theme;
  return {
    root: {
      display: 'flex',
      gap: '16px',
      padding: '32px 48px',
    },
    leftColumn: {
      flex: '30%',
      background: palette.common.white,
    },
    rightColumn: {
      flex: '70%',
    },
    rightColumnHeader: {
      background: palette.common.white,
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '12px',
      '& p': {
        color: palette.text.secondary,
      },
    },
  };
};

export default useDealsPageStyles;
