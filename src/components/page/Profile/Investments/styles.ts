import theme from '@/config/theme';

const { palette } = theme;

export const useInvestmentsStyles = () => {
  return {
    root: {
      padding: '24px',
      width: '100%',
    },
    title: {
      marginBottom: '4px',
      color: palette.text.disabled,
    },
    dealName: {
      maxWidth: '260px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
    },
  };
};
