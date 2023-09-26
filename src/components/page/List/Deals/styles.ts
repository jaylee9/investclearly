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
      '& .Mui-checked .MuiSvgIcon-root': {
        fill: palette.primary.light,
      },
      '&:hover .Mui-checked .MuiSvgIcon-root': {
        fill: palette.primary.dark,
      },
      '& .MuiSvgIcon-root': {
        fill: palette.text.disabled,
      },
      '&:hover .MuiSvgIcon-root': {
        fill: palette.secondary.dark,
      },
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
    mobileButtonWrapper: {
      display: 'flex',
      padding: '16px',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: 'white',
      borderTop: `1px solid ${palette.background.paper}`,
    },
    mobileClearButton: {
      cursor: 'pointer',
    },
    mobileHeader: {
      gap: '16px',
      display: 'flex',
      width: { xs: 'max-content', lg: '100%' },
      justifyContent: 'space-between',
      padding: '8px 16px',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    mobileHeaderTitle: {
      order: { xs: 1, lg: 0 },
      margin: '8px 0',
    },
    mobileHeaderIcon: { padding: 0, minWidth: 'auto' },
  };
};

export const useDealsComponentStyles = () => {
  return {
    filterMobileHeaderWrapper: {
      gap: '8px',
      width: '100%',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    filterButton: {
      gap: '8px',
      width: { xs: '100%', md: 'auto' },
      maxWidth: { xs: '311px', md: 'unset' },
      '& .icon-Filter': {
        fontSize: '24px',
      },
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
    mobileFilterWrapper: {
      height: '100%',
      padding: '0 0 4.5rem',
      background: 'white',
      overflowY: 'auto',
    },
  };
};

export const useColumnsComponentStyles = () => {
  return {
    root: {
      display: 'grid',
      gridTemplateColumns: { xs: '100%', lg: '25% 75%' },
      gap: '16px',
      padding: { xs: '16px', lg: '32px 48px' },
    },
    leftColumn: {
      flex: '25%',
      background: palette.common.white,
      borderRadius: '12px',
      boxShadow: customShadows.header,
      blockSize: 'fit-content',
      '& .MuiPaper-root': {
        '&:first-of-type': {
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
      display: 'flex',
      flexDirection: 'column',
    },
    rightColumnHeader: {
      rowGap: '8px',
      display: 'flex',
      flexDirection: 'column',
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
      flexWrap: 'wrap',
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
