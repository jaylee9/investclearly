import theme from '@/config/theme';

const { palette } = theme;

export const useSponsorComponentStyles = () => {
  return {
    filtersHeaderWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: '23px 16px 8px', lg: 0 },
      gap: { xs: '16px', lg: '12px' },
    },
    filtersHeaderTitleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
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
    sponsorsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '16px',
    },
    appliedFiltersWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flexWrap: 'wrap',
      paddingTop: '8px',
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
    mobileHeaderIcon: {
      padding: 0,
      minWidth: 'auto',
      position: { xs: 'absolute', md: 'initial' },
      top: '16px',
      right: '16px',
    },
  };
};

export const useSponsorsFiltersStyles = () => {
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
    activelyRisingWrapper: {},
    mobileClearButton: {
      cursor: 'pointer',
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
    mobileHeaderTitle: {
      order: { xs: 1, lg: 0 },
      margin: '8px 0',
    },
  };
};
