import { GlobalSearchVariant } from '@/components/page/Home/GlobalSearch/GlobalSearch';
import theme from '@/config/theme';
import { HeaderType } from '@/hooks/useHeaderProps';

interface HeaderStylesProps {
  type?: HeaderType;
  isShadow?: boolean;
  isShadowInFront?: boolean;
  variant?: GlobalSearchVariant;
  isSticky?: boolean;
}

const getStyles = ({
  type = 'dark',
  isShadow,
  isShadowInFront,
  variant,
  isSticky,
}: HeaderStylesProps) => {
  const rootPositionLightVariant = type?.toString().includes('light')
    ? 'absolute'
    : 'initial';
  const rootPosition = isSticky ? 'sticky' : rootPositionLightVariant;

  return {
    root: {
      display: 'flex',
      maxHeight: '80px',
      padding: {
        xs: '8px 16px',
        md: '18px 16px',
        lg: '16px 48px',
        xl: `16px calc(calc(100vw - ${theme.breakpoints.values.xl}px) / 2)`,
      },
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: isShadow ? theme.customShadows.header : 'none',
      filter: isShadowInFront
        ? `drop-shadow(${theme.customShadows.header})`
        : 'none',
      background: type.includes('search') ? theme.palette.common.white : '',
      zIndex: 1,
      position: rootPosition,
      top: 0,
      right: 0,
      width: '100%',
    },
    dealsPopover: {
      display: 'flex',
      gap: '24px',
      color:
        (type.includes('dark') && theme.palette.common.black) ||
        (type.includes('light') && theme.palette.common.white) ||
        '',
      fontSize: theme.typography.body1,
      alignItems: 'center',
    },
    menu: {
      '& .MuiPaper-root': {
        borderRadius: '12px',
      },
      '& .MuiList-root': {
        minWidth: '320px',
        maxWidth: '343px',
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.background.default,
        borderWidth: '1px',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      },
    },
    menuHeader: {
      gap: '8px',
      display: 'flex',
      alignItems: 'center',
      padding: '8px 8px 8px 12px',
    },
    menuHeaderTextWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    menuIcon: {
      marginRight: '12px',
    },
    menuText: {
      fontWeight: 600,
    },
    menuProfileItem: {
      padding: '8px',
    },
    menuItem: {
      padding: '8px 12px',
    },
    menuLogOutDivider: {
      marginTop: '0 !important',
      marginBottom: '0 !important',
    },
    menuLogOut: {
      color: theme.palette.primary.light,
      padding: '16px 24px',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    arrow: {
      fontSize: '24px',
      margin: '0 0 0 auto',
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s ease',
      color:
        (type.includes('dark') && theme.palette.text.secondary) ||
        (type.includes('light') && theme.palette.common.white) ||
        theme.palette.text.secondary,
    },
    popoverWrapper: {
      display: 'flex',
      width: '500px',
    },
    menuPopoverWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      '&:first-of-type': {
        borderRight: `1px solid ${theme.palette.background.paper}`,
      },
    },
    dealsCustomAccordion: {
      padding: '0 12px',
      borderBottom: 'none',
    },
    dealsCustomAccordionPopoverItem: {
      padding: '7px 8px',
      color: theme.palette.common.black,
    },
    popoverItem: {
      padding: '7px 24px',
      color: theme.palette.common.black,
    },
    dealsLink: {
      color: theme.palette.primary.light,
      fontWeight: 600,
    },
    leftSideWrapper: {
      display: 'flex',
      gap: '32px',
      height: '44px',
      alignItems: 'center',
      width: variant === GlobalSearchVariant.SMALL ? '100%' : 'auto',
      justifyContent:
        variant === GlobalSearchVariant.SMALL ? 'space-between' : 'flex-start',
    },
    avatarWrapper: {
      cursor: 'pointer',
    },
  };
};

export default getStyles;
