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
  };
};

export const useSponsorsFiltersStyles = () => {
  return {
    accordionContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    starsWrapper: {
      display: 'flex',
      gap: '4px',
    },
    ratingCheckbox: {
      padding: '4px 0px',
    },
    assetClassesWrapper: {
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
