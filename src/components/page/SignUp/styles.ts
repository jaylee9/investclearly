import theme from '@/config/theme';

export const useSignUpFormStyles = () => {
  return {
    root: {
      width: '420px',
      '& h2': {
        textAlign: 'center',
      },
      '& button': {
        width: '100%',
      },
      '& .MuiFormControl-root': {
        width: '100%',
        marginBottom: '20px',
      },
    },
    dividerWrapper: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 0px',
      '& .divider': {
        height: '1px',
        width: '33%',
        background: theme.palette.background.paper,
      },
    },
    nameWrapper: {
      display: 'flex',
      width: '100%',
      gap: '12px',
      '& .MuiFormControl-root': {
        width: '50%',
      },
    },
  };
};
