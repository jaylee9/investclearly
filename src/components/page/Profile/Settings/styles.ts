export const useEditProfileStyles = () => {
  return {
    root: {
      padding: '24px',
      height: '95%',
      '& .form': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    uploaderWrapper: {
      marginBottom: '12px',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '600px',
      flex: 1,
    },
    doubleInputsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      maxWidth: '560px',
      '& > div': {
        width: '50% !important',
      },
    },
    singleInputsWrapper: {
      maxWidth: '560px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'end',
      padding: '16px 0px',
    },
  };
};
