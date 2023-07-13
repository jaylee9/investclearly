import theme from '@/config/theme';

export const useLoginFormStyles = () => {
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
      '& a': {
        color: theme.palette.primary.light,
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
    forgotPasswordLink: {
      fontWeight: 600,
      marginBottom: '32px',
    },
  };
};
