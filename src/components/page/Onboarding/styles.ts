import theme from '@/config/theme';

export const useAccreditedInvestorStepStyles = () => {
  return {
    root: {
      '& h4': {
        fontWeight: 600,
      },
      '& p': {
        color: theme.palette.text.secondary,
      },
    },
  };
};
