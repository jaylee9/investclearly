import Image404 from '@/assets/components/Image404';
import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import useHeaderProps from '@/hooks/useHeaderProps';
import usePage404Styles from '@/pages_styles/page404styles';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { type FC } from 'react';

const Page404: FC = () => {
  const { isTablet } = useBreakpoints();
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isShadow: isTablet,
  });
  const classes = usePage404Styles();

  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.order}>
          <Typography variant="caption" sx={classes.blueTitle}>
            404 ERROR
          </Typography>
          <Typography variant="h2" sx={classes.title}>
            Page not found...
          </Typography>
          <Typography variant="body1" sx={classes.info}>
            It seems like you&apos;ve stumbled upon a page that doesn&apos;t
            exist! Let&apos;s get back on track and explore other opportunities
            together.
          </Typography>
          <Link href="/">
            <Button>To the homepage</Button>
          </Link>
        </Box>
        <Image404 />
      </Box>
    </Layout>
  );
};

export default Page404;
