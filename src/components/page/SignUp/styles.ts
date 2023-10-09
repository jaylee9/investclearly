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
    nameWrapper: {
      display: 'flex',
      width: '100%',
      gap: '12px',
    },
    googleLoginWrapper: {
      '& iframe': {
        width: '100% !important',
        margin: '0 !important',
      },
      display: 'flex',
      justifyContent: 'center',
    },
    additionalText: {
      display: 'block',
      marginBottom: '16px',
      color: theme.palette.text.secondary,
    },
  };
};

export const useConfirmEmailStyles = () => {
  return {
    root: {
      textAlign: 'center',
    },
    infoText: {
      color: theme.palette.text.secondary,
      marginBottom: '40px',
      textAlign: 'center',
      '& span': {
        fontWeight: 600,
      },
    },
    verificationInputWrapper: {
      marginBottom: '32px',
      display: 'flex',
      justifyContent: 'center',
    },
    sendAgainText: {
      cursor: 'pointer',
      color: theme.palette.primary.light,
    },
  };
};
