import theme from '@/config/theme';

export const useAuthStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      paddingTop: '116px',
      background: theme.palette.background.default,
    },
    content: {
      padding: '40px',
      borderRadius: '12px',
      background: theme.palette.common.white,
    },
  };
};
