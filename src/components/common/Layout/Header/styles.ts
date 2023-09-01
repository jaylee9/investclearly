import theme from '@/config/theme';
import { HeaderType } from '@/hooks/useHeaderProps';

interface HeaderStylesProps {
  type?: HeaderType;
  isShadow?: boolean;
}

const getStyles = ({ type = 'dark', isShadow }: HeaderStylesProps) => {
  return {
    root: {
      display: 'flex',
      padding: { xs: '16px', lg: '16px 48px' },
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: isShadow ? theme.customShadows.header : 'none',
      background: type.includes('search') ? theme.palette.common.white : '',
    },
    menu: {
      display: 'flex',
      gap: '24px',
      color:
        (type.includes('dark') && theme.palette.common.black) ||
        (type.includes('light') && theme.palette.common.white) ||
        '',
      fontSize: theme.typography.body1,
      alignItems: 'center',
    },
    mobileMenu: {
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
    mobileMenuHeader: {
      gap: '8px',
      display: 'flex',
      alignItems: 'center',
      padding: '8px 8px 8px 12px',
    },
    mobileMenuHeaderAvatar: {
      width: '36px',
      height: '36px',
    },
    mobileMenuHeaderTextWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    mobileMenuIcon: {
      marginRight: '12px',
    },
    mobileMenuText: {
      fontWeight: 600,
    },
    mobileMenuProfileItem: {
      padding: '8px',
    },
    mobileMenuItem: {
      padding: '8px 12px',
    },
    mobileMenuLogOutDivider: {
      marginTop: '0 !important',
      marginBottom: '0 !important',
    },
    mobileMenuLogOut: {
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
    mobileMenuPopoverWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      '&:first-child': {
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
    },
  };
};

export default getStyles;
