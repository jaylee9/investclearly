import theme from '@/config/theme';

const { palette } = theme;

const useUserProfilePageStyles = () => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: '24px 48px',
    },
    wrapper: {
      display: 'flex',
      borderRadius: '12px',
      background: palette.common.white,
      height: '80vh',
      width: '100%',
    },
    sideBar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      padding: '24px 16px',
      borderRight: `1px solid ${palette.background.paper}`,
      width: '20%',
      '& .section': {
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        color: palette.text.secondary,
        gap: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        borderRadius: '8px',
        '& i': {
          fontSize: '24px',
        },
      },
      '& .active-section': {
        color: palette.primary.light,
        background: palette.primary.contrastText,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
      },
    },
    content: {
      padding: '24px',
      width: '80%',
      height: '100%',
      overflow: 'auto',
    },
  };
};

export default useUserProfilePageStyles;
