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
        <Logo variant={LogoVariant.Light} />
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
