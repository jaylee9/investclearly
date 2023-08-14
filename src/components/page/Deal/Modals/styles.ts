import theme from '@/config/theme';

const { palette } = theme;

export const useAddDealModalStyles = () => {
  return {
    root: {
      '& h3': {
        fontWeight: 600,
        marginBottom: '4px',
      },
    },
    subTitle: {
      color: palette.text.secondary,
      marginBottom: '24px',
    },
  };
};
