import theme from '@/config/theme';

const getHomeStyles = () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    content: {
      maxWidth: '1376px',
      padding: '0px 25px',
    },
  };
};

export default getHomeStyles;
