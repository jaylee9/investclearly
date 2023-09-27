import theme from '@/config/theme';

const { palette } = theme;

const useUserProfilePageStyles = ({ href }: { href: string }) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: { xs: '24px 0px 0px', lg: '24px 48px' },
    },
    wrapper: {
      display: 'flex',
      borderRadius: '12px',
      background: { xs: palette.background.default, lg: palette.common.white },
      minHeight: '80vh',
      width: '100%',
    },
    sideBar: {
      display: { xs: 'none', lg: 'flex' },
      flexDirection: 'column',
      gap: '4px',
      padding: '24px 16px',
      borderRight: `1px solid ${palette.background.paper}`,
      width: '20%',
      '& .section': {
        padding: '8px 16px',
        display: 'flex',
        whiteSpace: 'nowrap',
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
    contentWrapper: {
      padding: {
        xs: href === 'investments' ? '24px 0px' : '0px',
        md: '24px 0px',
      },
      width: { xs: '100%', lg: '80%' },
      height: '100%',
      overflow: 'hidden',
    },
    content: {
      height: '100%',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    title: {
      marginBottom: '20px',
      fontWeight: '600',
      padding: {
        xs: '0px 16px',
        lg: '0px 24px',
      },
    },
  };
};

export default useUserProfilePageStyles;
