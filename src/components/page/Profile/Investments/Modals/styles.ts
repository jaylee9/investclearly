import theme from '@/config/theme';

const { palette } = theme;

export const useEditDealModalStyles = () => {
  return {
    symbol: {
      color: palette.text.disabled,
    },
    submitButton: {
      width: '100%',
    },
  };
};
