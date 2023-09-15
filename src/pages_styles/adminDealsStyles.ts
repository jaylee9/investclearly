import theme from '@/config/theme';

const { palette } = theme;

const useAdminDealsStyles = () => {
  return {
    title: {
      fontWeight: 600,
      marginBottom: '20px',
    },
    header: {
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      background: palette.common.white,
    },
    searchInput: {
      width: '320px',
    },
    noDealsContent: {
      borderRadius: '12px',
      background: palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      gap: '24px',
      '& h4': {
        fontWeight: 600,
      },
    },
    dealMainInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    dealImage: {
      borderRadius: '1320px',
    },
    ellipsisText: {
      maxWidth: '180px',
    },
    subTitle: {
      color: palette.text.secondary,
    },
    statusWrapper: {
      '& .open': {
        color: palette.success.main,
      },
      '& .closed': {
        color: palette.text.secondary,
      },
    },
    editIcon: {
      color: palette.text.secondary,
      fontSize: '24px',
    },
  };
};

export default useAdminDealsStyles;
