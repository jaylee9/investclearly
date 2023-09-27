import { Box } from '@mui/material';
import getStyles from './styles';
import Logo, { LogoVariant } from '@/assets/components/Logo';
import Link from 'next/link';
import { TLinks } from '@/types/common';

const links: TLinks = [
  { href: '/review', label: 'Write a Review' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/terms-conditions', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

const Footer = () => {
  const classes = getStyles();
  return (
    <Box sx={classes.root}>
      <Box sx={classes.content}>
        <Logo variant={LogoVariant.Light} />
        <Box sx={classes.linksWrapper}>
          {links.map(link => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </Box>
      </Box>
      <Box sx={classes.rights}>
        <span>Invest Clearly © 2023 All rights reserved</span>
      </Box>
    </Box>
  );
};

export default Footer;
