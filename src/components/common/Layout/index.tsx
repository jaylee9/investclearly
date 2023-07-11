import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/config/theme';
import Footer from './Footer';
import getLayoutStyles from './styles';
import { HeaderProps } from '@/hooks/useHeaderProps';

interface LayoutProps extends HeaderProps {
  children: ReactNode;
}

const Layout = ({
  children,
  isSearch,
  isLinks,
  isLogo,
  isShadow,
  isSignIn,
  logoVariant,
  title,
  type,
  content,
}: LayoutProps) => {
  const classes = getLayoutStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={classes.root}>
        <Box>
          <Header
            isSearch={isSearch}
            isLinks={isLinks}
            isLogo={isLogo}
            isShadow={isShadow}
            isSignIn={isSignIn}
            logoVariant={logoVariant}
            title={title}
            type={type}
            content={content}
          />
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
