import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import Logo from '@/assets/components/Logo';
import theme from '@/config/theme';
import { useAuthStyles, useDefaultStyles } from './styles';
import 'react-toastify/dist/ReactToastify.css';

type Variant = 'auth' | 'default';

type LayoutAdminPanelProps = {
  children: ReactNode;
  variant?: Variant;
};

const LayoutAdminPanel = ({
  variant = 'auth',
  children,
}: LayoutAdminPanelProps): JSX.Element => {
  const authStyles = useAuthStyles();
  const defaultStyles = useDefaultStyles();

  const variantMap: Record<Variant, JSX.Element> = {
    auth: (
      <Box sx={authStyles.root}>
        <Logo />
        <Box sx={authStyles.content}>{children}</Box>
      </Box>
    ),
    default: <Box sx={defaultStyles.root}>{children}</Box>,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-center" autoClose={3000} />
      {variantMap[variant]}
    </ThemeProvider>
  );
};

export default LayoutAdminPanel;
