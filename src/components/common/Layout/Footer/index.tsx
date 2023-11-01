import { Box, Typography } from '@mui/material';
import getStyles from './styles';
import Logo, { LogoVariant } from '@/assets/components/Logo';
import { TLinks } from '@/types/common';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/User';
import { useState } from 'react';
import CreateReviewForm from '../../CreateReview';

const links: TLinks = [
  { href: '/review', label: 'Write a Review' },
  { href: '/terms-conditions', label: 'Terms & Conditions' },
];

const Footer = () => {
  const classes = getStyles();
  const router = useRouter();
  const { user } = useUser();
  const [openCreateReview, setOpenCreateReview] = useState(false);
  const handleLinkClick = (href: string) => {
    if (href === '/review') {
      if (!!user) {
        setOpenCreateReview(true);
      } else {
        router.push('/login');
      }
    } else {
      router.push(href);
    }
  };

  const handleCloseCreateReviewForm = () => setOpenCreateReview(false);

  return (
    <Box sx={classes.root}>
      <Box sx={classes.content}>
        <Box width="33%">
          <Logo variant={LogoVariant.Light} />
        </Box>
        <Typography sx={classes.disclaimer}>
          Invest Clearly, LLC is not providing any securities or other interest
          in any company listed on this site in any way, is not promoting any
          company, and is not affiliated with any such companies. Invest
          Clearly, LLC has not verified the accuracy or completeness of any
          information contained on this site.  Each investor or user of this
          site is solely responsible for confirming whether all information that
          it obtains is accurate and complete, and is further responsible for
          engaging all necessary professionals and advisors needed to make any
          investment decisions.
        </Typography>
        <Box sx={classes.linksWrapper}>
          {links.map(link => (
            <Typography
              key={link.href}
              variant="body1"
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={classes.rights}>
        <span>Invest Clearly © 2023 All rights reserved</span>
      </Box>
      <CreateReviewForm
        open={openCreateReview}
        onClose={handleCloseCreateReviewForm}
      />
    </Box>
  );
};

export default Footer;
