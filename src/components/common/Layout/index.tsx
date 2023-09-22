import { Box, CssBaseline, Typography, Grid } from '@mui/material';
import Header from './Header';
import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/config/theme';
import Footer from './Footer';
import {
  useAdminLayoutStyles,
  useDefaultLayoutStyles,
  useEntryLayoutStyles,
} from './styles';
import { HeaderProps } from '@/hooks/useHeaderProps';
import Logo, { LogoVariant } from '@/assets/components/Logo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { logout } from '@/actions/auth';

export enum LayoutVariant {
  Default = 'default',
  Entry = 'entry',
  Admin = 'admin',
}
interface LayoutProps extends HeaderProps {
  children: ReactNode;
  variant?: LayoutVariant;
  isEntrySpacing?: boolean;
  isFooter?: boolean;
}

const adminLinks = [
  {
    href: 'deals',
    label: 'Deals',
    icon: 'icon-Deals',
  },
  {
    href: 'sponsors',
    label: 'Sponsors',
    icon: 'icon-Sponsor',
  },
  {
    href: 'review-moderation',
    label: 'Review Moderation',
    icon: 'icon-Review',
  },
];

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
  const adminStyles = useAdminLayoutStyles();

  const { pathname, push } = useRouter();

  const activeAdminLinkClassName = (path: string) =>
    clsx('defaultLink', {
      activeLink: pathname.includes(path),
    });

  const handleLogout = async () => {
    const response = await logout();
    if (!('error' in response)) {
      push('/');
    }
  };

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
          <Grid container sx={entryStyles.container}>
            <Grid item xs={12} xl={4}>
              <Box sx={entryStyles.leftPartWrapper}>
                <Box sx={entryStyles.leftPartContent}>
                  <Logo variant={LogoVariant.LightText} />
                  <Box sx={entryStyles.textContent}>
                    <Typography variant="h1">
                      Invest Clearly.
                      <br /> Invest Confidently.
                    </Typography>
                    <Typography variant="body1">
                      Real Estate syndications and funds in one place, paired
                      with sponsor reviews from investors like you, so that you
                      can invest with confidence.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} xl={8} sx={entryStyles.rightContainer}>
              <Box sx={entryStyles.rightPartWrapper}>{children}</Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {variant === LayoutVariant.Admin && (
        <Box sx={adminStyles.root}>
          <Box sx={adminStyles.sideBar}>
            <Box sx={adminStyles.logoWrapper}>
              <Logo />
            </Box>
            <Box sx={adminStyles.linksWrapper}>
              {adminLinks.map(link => (
                <Link key={link.href} href={`/admin-panel/${link.href}`}>
                  <Typography
                    variant="body1"
                    className={activeAdminLinkClassName(link.href)}
                  >
                    <i className={link.icon} />
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
          <Box sx={adminStyles.headerWithContentWrapper}>
            <Box sx={adminStyles.header}>
              <Typography
                variant="body1"
                className="logoutLink"
                onClick={handleLogout}
              >
                <i className="icon-Log-out" />
                Log out
              </Typography>
            </Box>
            <Box sx={adminStyles.children}>{children}</Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Layout;
