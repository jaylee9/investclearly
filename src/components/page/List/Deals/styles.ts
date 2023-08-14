import theme from '@/config/theme';

const { palette, customShadows } = theme;
export const useDealsFiltersStyles = () => {
  return {
    starsWrapper: {
      display: 'flex',
      gap: '4px',
    },
    ratingCheckbox: {
      padding: '4px 0px',
    },
    accordionContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginBottom: '12px',
    },
    showMore: {
      fontWeight: 600,
      color: palette.primary.light,
      padding: '4px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      '& span': {
        fontSize: '24px',
      },
    },
    buttonWrapper: {
      padding: '12px 16px',
      textAlign: 'end',
    },
  };
};

export const useDealsComponentStyles = () => {
  return {
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
    appliedFilter: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '14px',
      border: `1px solid ${palette.background.paper}`,
      '& .icon-Cross': {
        fontSize: '16px',
        color: palette.text.disabled,
        cursor: 'pointer',
      },
    },
  };
};

export const useColumnsComponentStyles = () => {
  return {
    root: {
      display: 'flex',
      gap: '16px',
      padding: '32px 48px',
    },
    leftColumn: {
      flex: '25%',
      background: palette.common.white,
      borderRadius: '12px',
      boxShadow: customShadows.header,
      '& .MuiPaper-root': {
        '&:first-child': {
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
      borderRadius: '12px',
      '& p': {
        color: palette.text.secondary,
      },
      marginBottom: '16px',
    },
    rightColumnHeaderTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightColumnHeaderContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
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
