import theme from '@/config/theme';
import { GlobalSearchVariant } from './GlobalSearch/GlobalSearch';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { HeaderType } from '@/hooks/useHeaderProps';

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
  const { isSmallMobile } = useBreakpoints();
  return {
    root: {
      backgroundImage: 'url(/assets/mainPageBanner.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: { xs: '425px', sm: '390px', md: '356px' },
      paddingTop: { xs: isSmallMobile ? '105px' : '140px', lg: '170px' },
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      color: theme.palette.common.white,
      alignItems: 'center',
      marginBottom: { xs: '48px', md: '' },
      padding: { xs: '0 16px', md: '0 40px' },
    },
    title: {
      textAlign: 'center',
      fontWeight: 600,
    },
    subTitle: {
      maxWidth: '736px',
      textAlign: 'center',
    },
  };
};

export const useGlobalSearchStyles = ({
  variant,
  isMobileSearchInput,
  type = 'light',
}: {
  variant: GlobalSearchVariant;
  isMobileSearchInput?: boolean;
  type?: HeaderType;
}) => {
  const rootWidthMobile = isMobileSearchInput ? '100%' : 'max-content';
  const rootWidth =
    variant === GlobalSearchVariant.SMALL
      ? rootWidthMobile
      : { xs: '100%', lg: 'auto' };
  const rootMaxWidth =
    (type.includes('dark') && { xs: '100%', md: '320px' }) || '100%';
  const rootMinWidth =
    (type.includes('dark') && {
      xs: isMobileSearchInput ? '100%' : '',
      md: '320px',
    }) ||
    '100%';
  const rootHeight =
    (type.includes('dark') && '44px') ||
    (type.includes('light') && '56px') ||
    '';
  const rootPosition = {
    xs:
      (type.includes('dark') && 'initial') ||
      (type.includes('light') && 'absolute'),
    lg: 'initial',
  };
  const rootBottom =
    (type.includes('dark') && 0) || (type.includes('light') && '-25px') || '';

  return {
    root: {
      width: rootWidth,
      maxWidth: rootMaxWidth,
      minWidth: rootMinWidth,
      height: rootHeight,
      position: rootPosition,
      bottom: rootBottom,
    },
    searchInputWrapper: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    },
    searchInput: {
      width: {
        xs: 'calc(100vw - 32px)',
        md: 'calc(100vw - 80px)',
        lg: '736px',
      },
      boxShadow: theme.customShadows.header,
      '& div': {
        paddingRight: '4px !important',
      },
      marginBottom: '8px',
      position: { xs: 'absolute' },
      top: { xs: 0, lg: '12px' },
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    searchButton: {
      boxSizing: 'border-box',
      padding: { xs: '0 !important', md: '12px 40px !important' },
      minWidth: { xs: '48px !important', md: 'auto !important' },
      height: '48px !important',
    },
    searchContent: {
      overflow: 'auto',
      maxHeight: '410px',
      background: theme.palette.common.white,
      width:
        (type.includes('dark') && '100%') ||
        (type.includes('light') && {
          xs: 'calc(100vw - 32px)',
          md: 'calc(100vw - 80px)',
          lg: '736px',
        }),
      margin: '0 auto',
      borderRadius: '16px',
      border: `1px solid ${theme.palette.background.paper}`,
      boxShadow: theme.customShadows.base,
      padding: '8px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      top: '8px',
      zIndex: 10,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
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
      maxHeight: '48px',
      maxWidth: '48px',
    },
    blockListItemContentTitle: {
      fontWeight: 500,
      margin: 0,
    },
    blockListItemDefaultText: {
      color: theme.palette.text.secondary,
    },
    dealTypes: { display: 'flex', alignItems: 'center', gap: '4px' },
    sponsorRating: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      '& .icon-Star': {
        fontSize: '12px',
        color: theme.palette.secondary.main,
      },
      color: theme.palette.secondary.main,
      '& span': {
        '&:last-child': {
          color: theme.palette.text.secondary,
        },
      },
    },
    noResults: {
      color: theme.palette.text.secondary,
    },
    globalSearchMobileInputWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
};

export const useNewDealsBlockStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: { xs: '0', xl: '0 calc(calc(1376px - 100vw) / 2)' },
      padding: { xs: '64px 16px', md: '80px 40px', lg: '100px' },
      backgroundColor: theme.palette.common.white,
      width: '100vw',
    },
    dealCardsWrapper: {
      width: '100%',
      maxWidth: '1376px',
      gap: '16px',
      display: 'flex',
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
      padding: { xs: '64px 16px', md: '80px 40px', lg: '100px 25px' },
      maxWidth: '1376px',
    },
    gridContainer: {
      width: { xs: '100%' },
      marginLeft: { xs: 0, lg: '-40px' },
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
    sponsorGridContainer: {
      paddingLeft: { xs: '0 !important', lg: '40px !important' },
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
      padding: { xs: '64px 16px', md: '80px 25px', lg: '100px 25px' },
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
    link: {
      transition: 'color 0.3s ease',
      '&:hover': {
        color: theme.palette.primary.light,
        '& i': {
          color: `${theme.palette.primary.light} !important`,
        },
      },
    },
    gridContainerStyles: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    gridContentStyles: {
      maxWidth: 1376,
      width: '100%',
    },
  };
};

export const useBannerBlockStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '320px',
      padding: { xs: '0 16px', md: '0 64px', lg: '80px' },
      backgroundImage: 'url(/assets/writeReviewBanner.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100%',
      gap: '24px',
      '& h2': {
        color: theme.palette.common.white,
        textAlign: 'center',
        fontWeight: 600,
        maxWidth: '800px',
      },
    },
  };
};
