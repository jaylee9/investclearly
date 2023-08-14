import theme from '@/config/theme';

const { palette } = theme;

export const useSponsorComponentStyles = () => {
  return {
    filtersHeaderWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    filtersHeaderTitleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
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

export const useSponsorsFiltersStyles = () => {
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
    activelyRisingWrapper: {},
  };
};
