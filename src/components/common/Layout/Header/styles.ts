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
      padding: '16px 48px',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: isShadow ? theme.customShadows.header : 'none',
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
    link: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    arrow: {
      fontSize: '24px',
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s ease',
      color:
        (type.includes('dark') && theme.palette.text.secondary) ||
        (type.includes('light') && theme.palette.common.white) ||
        theme.palette.text.secondary,
    },
    popoverWrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'start',
      justifyItems: 'start',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        borderLeft: `1px solid ${theme.palette.background.paper}`,
        transform: 'translateX(-50%)',
      },
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
