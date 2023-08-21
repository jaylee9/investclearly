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
  };
};

export default usePublicUserPageStyles;
