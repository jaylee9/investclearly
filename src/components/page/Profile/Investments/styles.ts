import theme from '@/config/theme';

const { palette } = theme;

export const useAllInvestmentsStyles = () => {
  return {
    root: {
      padding: '24px',
      width: '100%',
    },
    title: {
      marginBottom: '4px',
      color: palette.text.disabled,
    },
  };
};
