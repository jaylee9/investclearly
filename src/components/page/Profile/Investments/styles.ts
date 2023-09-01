import theme from '@/config/theme';

const { palette } = theme;

export const useInvestmentsStyles = () => {
  return {
    root: {
      padding: '24px',
      width: '100%',
    },
    title: {
      marginBottom: '4px',
      color: palette.text.disabled,
    },
    totalInvested: {
      fontWeight: 600,
      marginBottom: '24px',
    },
    dealName: {
      maxWidth: '260px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
    },
    editIcon: {
      fontSize: '24px',
      padding: '8px',
      color: palette.text.secondary,
    },
    deleteIcon: {
      fontSize: '24px',
      padding: '8px',
      color: palette.error.light,
    },
    tableWrapperHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      '& h5': {
        fontWeight: 600,
      },
    },
    searchWrapper: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    noDealsTitle: {
      fontWeight: 600,
      marginBottom: '16px',
    },
    noDealsSubTitle: {
      color: palette.text.secondary,
      marginBottom: '12px',
    },
  };
};
