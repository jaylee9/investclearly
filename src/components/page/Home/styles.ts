import theme from '@/config/theme';

export const blueTitleStyles = {
  color: theme.palette.primary.light,
  fontWeight: 600,
  marginBottom: '8px',
};

export const viewAllLink = {
  fontWeight: 600,
  color: theme.palette.primary.light,
};

export const useHeadBlockStyles = () => {
  return {
    root: {
      backgroundImage: 'url(/assets/mainPageBanner.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '356px',
      marginTop: '-90px',
      paddingTop: '170px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '100px',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      color: theme.palette.common.white,
      alignItems: 'center',
      marginBottom: '48px',
    },
    title: {
      fontWeight: 600,
    },
    subTitle: {
      maxWidth: '736px',
      textAlign: 'center',
    },
  };
};

export const useGlobalSearchStyles = () => {
  return {
    searchInput: {
      width: '736px',
      boxShadow: theme.customShadows.header,
      '& div': {
        paddingRight: '4px !important',
      },
      marginBottom: '8px',
    },
    searchButton: {
      boxSizing: 'border-box',
      padding: '12px 40px !important',
      height: '48px !important',
    },
    searchContent: {
      overflow: 'auto',
      maxHeight: '410px',
      background: theme.palette.common.white,
      width: '100%',
      borderRadius: '16px',
      border: `1px solid ${theme.palette.background.paper}`,
      boxShadow: theme.customShadows.base,
      padding: '8px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 10,
    },
    showAllLink: {
      fontWeight: 600,
      color: theme.palette.primary.light,
    },
    block: {
      marginBottom: '8px',
    },
    blockTitleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    blockTitle: {
      color: theme.palette.text.disabled,
    },
    blockListItem: {
      padding: '8px 0px',
      display: 'flex',
      gap: '12px',
    },
    blockListItemImage: {
      borderRadius: '100px',
    },
    blockListItemContentTitle: {
      fontWeight: 500,
      margin: 0,
    },
    blockListItemDefaultText: {
      color: theme.palette.text.secondary,
    },
    dealTypes: { display: 'flex', alignItems: 'center', gap: '4px' },
  };
};

export const useNewDealsBlockStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '100px',
    },
    dealCardsWrapper: {
      display: 'flex',
      gap: '16px',
      marginBottom: '40px',
    },
    dealCardContent: {
      padding: '16px 20px',
    },
    dealName: {
      fontWeight: 600,
    },
    dealLocation: {
      color: theme.palette.text.secondary,
      marginBottom: '12px',
    },
    dealDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.palette.text.secondary,
      '& i': {
        fontSize: '24px',
        color: theme.palette.primary.light,
      },
    },
  };
};

export const useTopRatedSponsorsBlockStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '100px 0px',
    },
    title: {
      fontWeight: 600,
      maxWidth: '354px',
      marginBottom: '32px',
    },
    informationItem: {
      display: 'flex',
      gap: '8px',
      '& i': {
        fontSize: '24px',
        color: theme.palette.primary.light,
      },
      '& h5': {
        fontWeight: 600,
      },
      '& p': {
        color: theme.palette.text.secondary,
      },
    },
    sponsorWrapper: {
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow: theme.customShadows.header,
      border: `1px solid ${theme.palette.background.paper}`,
    },
    sponsorImage: {
      borderRadius: '100px',
      marginBottom: '12px',
    },
    sponsorRating: {
      color: theme.palette.secondary.main,
      '& i': {
        fontSize: '16px',
      },
      '& span': {
        color: theme.palette.text.secondary,
      },
    },
  };
};

export const useDealsBlockStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '100px 0px',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      maxHeight: '370px',
      columnCount: 2,
      columnGap: '16px',
      gap: '8px',
      '& a': {
        '& p': {
          display: 'flex',
          alignItems: 'center',
        },
        '& i': {
          fontSize: '24px',
          color: theme.palette.text.disabled,
        },
      },
    },
  };
};

export const useWriteReviewBlockStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '320px',
      backgroundImage: 'url(/assets/mainPageBanner.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      marginBottom: '100px',
      width: '100%',
      gap: '24px',
      '& h2': {
        color: theme.palette.common.white,
        textAlign: 'center',
        fontWeight: 600,
      },
    },
  };
};
