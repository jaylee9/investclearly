import { createTheme } from '@mui/material/styles';

declare module '@mui/system' {
  interface Theme {
    customShadows: {
      base: string;
      header: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      base?: string;
      header?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    common: {
      black: '#1E2B43',
      white: '#FFFFFF',
    },
    background: {
      default: '#F6F7FA',
      paper: '#DBE4F2',
    },
    primary: {
      main: '#2C5EE0',
      light: '#4F7FF8',
      dark: '#658DF3',
      contrastText: '#EDF6FF',
    },
    secondary: {
      main: '#F58F29',
      dark: '#B4C2D7',
    },
    error: {
      main: '#C2192A',
      light: '#D72638',
      dark: '#D74A58',
      contrastText: '#FBE9EB',
    },
    success: {
      main: '#1D9E60',
      contrastText: '#E8F5EF',
    },
    text: {
      primary: '#1E2B43',
      secondary: '#717C89',
      disabled: '#A6B0BB',
    },
  },
  typography: {
    fontFamily: ['Inter, Arial, sans-serif'].join(','),
    h1: {
      fontSize: 40,
      lineHeight: '52px',
      '@media (max-width:744px)': {
        fontSize: 32,
        lineHeight: '40px',
      },
    },
    h2: {
      fontSize: 32,
      lineHeight: '40px',
      '@media (max-width:744px)': {
        fontSize: 28,
        lineHeight: '36px',
      },
    },
    h3: {
      fontSize: 26,
      lineHeight: '36px',
      '@media (max-width:744px)': {
        fontSize: 24,
        lineHeight: '32px',
      },
    },
    h4: {
      fontSize: 24,
      lineHeight: '32px',
      '@media (max-width:744px)': {
        fontSize: 20,
        lineHeight: '28px',
      },
    },
    h5: {
      fontSize: 18,
      lineHeight: '26px',
    },
    body1: {
      fontSize: 15,
      lineHeight: '26px',
    },
    caption: {
      fontSize: 13,
      lineHeight: '20px',
    },
  },
  customShadows: {
    base: '0px 4px 12px 0px rgba(30, 43, 67, 0.06)',
    header: '8px 12px 32px 0px rgba(113, 124, 137, 0.06)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#1E2B43',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1376,
    },
  },
});

export default theme;
