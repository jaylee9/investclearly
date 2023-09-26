import theme from '@/config/theme';

const useSponsorPageStyles = () => {
  const { palette, customShadows } = theme;
  return {
    wrapper: {
      padding: { xs: 0, md: '16px', lg: '32px 48px' },
    },
    fixedHeader: {
      background: palette.common.white,
      position: 'fixed',
      width: '100%',
      zIndex: 100,
      top: 0,
      padding: { xs: '0 16px', md: '16px', lg: '12px 48px 0px' },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: { lg: 'center' },
      boxShadow: customShadows.header,
    },
    fixedHeaderInfo: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      paddingBottom: '12px',
      '& img': {
        borderRadius: '1230px',
      },
      '& h5': {
        fontWeight: 600,
      },
    },
    root: {
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: '16px',
    },
    leftColumn: {
      width: { xs: '100%', lg: '70%' },
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    rightColumn: {
      width: { xs: '100%', lg: '30%' },
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    info: {
      width: '100%',
      background: palette.common.white,
      padding: { xs: '24px 16px 0', lg: '40px 40px 0px' },
      borderRadius: { xs: 'unset', md: '12px' },
      marginBottom: '16px',
    },
    infoHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: { xs: 'relative', md: 'initial' },
      marginBottom: { xs: '16px', md: '24px' },
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
      '& p': {
        color: palette.text.secondary,
      },
    },
    infoHeaderMain: {
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: '12px', md: '24px' },
    },
    infoHeaderActions: {
      display: 'flex',
      gap: '20px',
      position: { xs: 'absolute', md: 'initial' },
      top: '12px',
      right: '12px',
      alignItems: 'center',
      '& .icon-Saved': {
        fontSize: '24px',
        color: palette.text.secondary,
        cursor: 'pointer',
      },
    },
    websiteButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      '& .icon-Link': {
        fontSize: '24px',
      },
    },
    infoContent: {
      gap: '12px',
      display: { xs: 'grid', lg: 'flex' },
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'none' },
      justifyContent: { lg: 'space-between' },
      width: { xs: '100%', lg: '70%' },
      margin: { xs: '24px 0', md: '0 0 24px' },
    },
    infoContentColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    infoContentDetail: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      '& i': {
        fontSize: '24px',
        color: palette.primary.light,
      },
      '& span': {
        color: palette.text.disabled,
        marginBottom: '4px',
      },
      '& p': {
        fontWeight: 500,
      },
    },
    overview: {
      padding: { xs: '24px 16px', lg: '40px' },
      background: palette.common.white,
      borderRadius: '12px',
    },
    overviewHeader: {
      '& h3': {
        fontWeight: 600,
        marginBottom: '12px',
      },
      '& p': {
        color: palette.text.secondary,
      },
      marginBottom: '32px',
    },
    overviewContent: {
      '& h5': {
        fontWeight: 600,
      },
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    overviewDetails: {
      width: { xs: '100%', lg: '70%' },
      display: 'flex',
      justifyContent: 'space-between',
    },
    overviewDetailswrapper: {
      gap: '12px',
      display: { xs: 'grid', lg: 'flex' },
      width: { xs: '100%', lg: '60%' },
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'none' },
      justifyContent: 'space-between',
      '& span': {
        color: palette.text.disabled,
        marginBottom: '4px',
      },
      '& p': {
        fontWeight: 500,
      },
    },
    dealsOverview: {
      padding: { xs: '24px 16px', lg: '40px' },
      background: palette.common.white,
      borderRadius: { xs: 'unset', md: '12px' },
    },
    dealsBlockHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      '& h3': {
        fontWeight: 600,
      },
      '& p': {
        padding: '2px 8px',
        background: palette.background.default,
        borderRadius: '20px',
        color: palette.text.secondary,
      },
    },
    dealsBlockContent: {
      display: 'flex',
      gap: '12px',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    dealCard: {
      width: { xs: '100%', md: 'calc((100% - 24px) / 3)' },
      '& h5': {
        maxWidth: '340px',
      },
    },
    textWithButton: {
      padding: { xs: '24px 16px', lg: '24px 28px' },
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: palette.primary.contrastText,
      borderRadius: { xs: 'unset', md: '12px' },
      border: `1px solid ${palette.background.paper}`,
      '& p': {
        fontWeight: 600,
      },
    },
    sponsorInfo: {
      padding: { xs: '24px 16px', lg: '24px 28px' },
      background: palette.common.white,
      borderRadius: '12px',
      display: { xs: 'grid', lg: 'flex' },
      gridTemplateColumns: { xs: '1fr 1fr', lg: 'none' },
      gap: '16px',
      '& span': {
        color: palette.text.disabled,
      },
      '& p': {
        fontWeight: 500,
      },
    },
    sponsorInfoColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    sponsorRating: {
      color: `${palette.secondary.main} !important`,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontWeight: 600,
      '& .icon-Star': {
        fontSize: '16px',
        color: palette.secondary.main,
      },
      '& span': {
        fontWeight: 400,
        color: palette.text.secondary,
      },
    },
    reviewsWrapper: {
      padding: { xs: '24px 16px', lg: '40px' },
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: palette.common.white,
      borderRadius: { xs: 'unset', md: '12px' },
    },
    reviewsWrapperHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reviewsWrapperTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      '& h3': {
        fontWeight: 600,
      },
      '& p': {
        padding: '2px 8px',
        background: palette.background.default,
        borderRadius: '20px',
        color: palette.text.secondary,
      },
    },
    reviewsContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: { xs: 0, lg: '16px' },
    },
    showMoreLink: {
      cursor: 'pointer',
      color: palette.primary.light,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 600,
      gap: '8px',
      '& i': {
        fontSize: '24px',
      },
    },
    bookmarkIcon: {
      color: palette.text.secondary,
      cursor: 'pointer',
      width: '24px',
    },
    filledBookmarkIcon: {
      color: palette.primary.light,
      cursor: 'pointer',
      width: '24px',
    },
    customTabs: {
      overflow: { md: 'initial' },
      '& .MuiTabs-scroller': {
        overflow: { md: 'initial !important' },
      },
      '& .MuiTabs-indicator': {
        backgroundColor: palette.primary.light,
        bottom: { md: '-16px', lg: '-9px' },
      },
    },
  };
};

export default useSponsorPageStyles;
