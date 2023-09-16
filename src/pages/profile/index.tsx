import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import useUserProfilePageStyles from '@/pages_styles/userProfilePageStyles';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import ProfileInvestments from '@/components/page/Profile/Investments';
import withPrivateRoute from '@/HOC/withPrivateRoute';
import ProfileReviews from '@/components/page/Profile/Reviews';
import ProfileSaved from '@/components/page/Profile/Saved';
import ProfileSettings from '@/components/page/Profile/Settings';

const sections = [
  {
    label: 'Investments',
    icon: 'icon-Investment',
    href: 'investments',
    component: <ProfileInvestments />,
  },
  {
    label: 'My Reviews',
    icon: 'icon-Review',
    href: 'reviews',
    component: <ProfileReviews />,
  },
  {
    label: 'Saved',
    icon: 'icon-Saved',
    href: 'saved',
    component: <ProfileSaved />,
  },
  {
    label: 'Profile Settings',
    icon: 'icon-Settings',
    href: 'settings',
    component: <ProfileSettings />,
  },
];

const UserProfilePage = () => {
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isShadow: false,
  });
  const classes = useUserProfilePageStyles();
  const router = useRouter();
  const activeTab = sections.find(item => item.href === router.query.section);
  const layoutProps = { isFooter: false, ...headerProps };
  const sectionClassName = (href: string) =>
    clsx('section', {
      'active-section': activeTab?.href === href,
    });
  const handleSectionClick = (href: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, section: href },
    });
  };

  return (
    <Layout {...layoutProps}>
      <Box sx={classes.root}>
        <Box sx={classes.wrapper}>
          <Box sx={classes.sideBar}>
            {sections.map(section => (
              <Typography
                variant="body1"
                key={section.href}
                className={sectionClassName(section.href)}
                onClick={() => handleSectionClick(section.href)}
              >
                <i className={section.icon}></i>
                {section.label}
              </Typography>
            ))}
          </Box>
          <Box sx={classes.contentWrapper}>
            <Box sx={classes.content}>
              <Typography variant="h3" fontWeight={600} marginBottom="20px">
                {activeTab?.label}
              </Typography>
              {activeTab?.component}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default withPrivateRoute(UserProfilePage);
