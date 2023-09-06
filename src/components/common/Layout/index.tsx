import { Box, CssBaseline, Typography } from '@mui/material';
import Header from './Header';
import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/config/theme';
import Footer from './Footer';
import { useDefaultLayoutStyles, useEntryLayoutStyles } from './styles';
import { HeaderProps } from '@/hooks/useHeaderProps';
import Logo, { LogoVariant } from '@/assets/components/Logo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export enum LayoutVariant {
  Default = 'default',
  Entry = 'entry',
}
interface LayoutProps extends HeaderProps {
  children: ReactNode;
  variant?: LayoutVariant;
  isEntrySpacing?: boolean;
  isFooter?: boolean;
}

const Layout = ({
  variant = LayoutVariant.Default,
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
  onChangeSearch,
  isEntrySpacing = false,
  isSticky,
  isFooter = true,
}: LayoutProps) => {
  const defaultStyles = useDefaultLayoutStyles();
  const entryStyles = useEntryLayoutStyles(isEntrySpacing);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-center" autoClose={3000} />
      {variant === LayoutVariant.Default && (
        <Box sx={defaultStyles.root}>
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
              onChangeSearch={onChangeSearch}
              isSticky={isSticky}
            />
            {children}
          </Box>
          {isFooter && <Footer />}
        </Box>
      )}
      {variant === LayoutVariant.Entry && (
        <Box sx={entryStyles.root}>
          <Box sx={entryStyles.leftPartWrapper}>
            <Box sx={entryStyles.leftPartContent}>
              <Logo variant={LogoVariant.LightText} />
              <Box sx={entryStyles.textContent}>
                <Typography variant="h1">
                  Invest Clearly.
                  <br /> Invest Confidently.
                </Typography>
                <Typography variant="body1">
                  Real Estate syndications and funds in one place, paired with
                  sponsor reviews from investors like you, so that you can
                  invest with confidence.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={entryStyles.rightPartWrapper}>{children}</Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Layout;
