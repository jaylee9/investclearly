import theme from '@/config/theme';

const usePublicUserPageStyles = () => {
  const { palette } = theme;
  return {
    root: {
      display: 'flex',
      gap: '16px',
      padding: '32px 48px',
    },
    userInfo: {
      width: '25%',
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      background: palette.common.white,
      gap: '12px',
      borderRadius: '12px',
      alignItems: 'center',
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    rightColumnBlock: {
      padding: '40px',
      borderRadius: '12px',
      background: palette.common.white,
      '& h3': {},
    },
  };
};

export default usePublicUserPageStyles;
