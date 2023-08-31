const useHomeStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    content: {
      maxWidth: { xs: '100%', xl: '1376px' },
    },
  };
};

export default useHomeStyles;
