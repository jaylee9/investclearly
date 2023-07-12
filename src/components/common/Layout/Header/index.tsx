import React, { useState } from 'react';
import Logo from '@/assets/components/Logo';
import getStyles from './styles';
import { Box } from '@mui/material';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CustomPopover from '@/components/common/Popover';
import { TLinks } from '@/types/common';
import { HeaderProps } from '@/hooks/useHeaderProps';

const links: TLinks = [
  { href: '/review', label: 'Write a Review' },
  { href: '/sponsor-profile', label: 'Claim Sponsor Profile' },
];

const popoverMockData: { value: string; href: string }[] = [
  { value: 'Build-to-Rent', href: '/example' },
  { value: 'Co-Living', href: '/example' },
  { value: 'Data Center', href: '/example' },
  { value: 'Flex R&D', href: '/example' },
  { value: 'Flex/Office', href: '/example' },
  { value: 'Hospitality', href: '/example' },
  { value: 'Industrial', href: '/example' },
  { value: 'Land Manufactured Housing', href: '/example' },
  { value: 'Medical Office', href: '/example' },
  { value: 'Mixed Use', href: '/example' },
  { value: 'Mobile Home', href: '/example' },
  { value: 'Multi-Asset', href: '/example' },
  { value: 'Multifamily', href: '/example' },
  { value: 'Office', href: '/example' },
  { value: 'Parking Garage', href: '/example' },
  { value: 'Retail', href: '/example' },
  { value: 'Senior Housing', href: '/example' },
  { value: 'Single Family', href: '/example' },
  { value: 'Specialty', href: '/example' },
  { value: 'All Deals', href: '/example' },
  { value: 'Storage', href: '/example' },
];

const Header = ({
  content,
  logoVariant,
  isSearch,
  title,
  isLinks,
  isSignIn,
  type,
  isShadow,
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const classes = getStyles({ type, isShadow });
  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };
  const handleArrowClick = () => {
    setIsArrowRotated(!isArrowRotated);
  };
  return (
    <header style={classes.root}>
      {!!content && content}
      <Box sx={classes.leftSideWrapper}>
        <Logo variant={logoVariant} />
        {isSearch && (
          <Input
            variant="filled"
            isSearch
            placeholder="Search"
            onChange={e => handleChangeSearch(e)}
            value={searchValue}
          />
        )}
        {title && title}
      </Box>
      <Box sx={classes.menu}>
        {isLinks && (
          <>
            <CustomPopover
              open={isArrowRotated}
              handleClose={() => setIsArrowRotated(false)}
              trigger={
                <p style={classes.link} onClick={handleArrowClick}>
                  <span>Deals</span>
                  <i
                    className={`icon-Caret-down ${
                      isArrowRotated ? 'rotate' : ''
                    }`}
                    style={classes.arrow}
                  ></i>
                </p>
              }
            >
              <Box sx={classes.popoverWrapper}>
                {popoverMockData.map(item => (
                  <Link
                    href={item.href}
                    key={item.value}
                    style={
                      item.value === 'All Deals'
                        ? { ...classes.popoverItem, ...classes.dealsLink }
                        : classes.popoverItem
                    }
                  >
                    {item.value}
                  </Link>
                ))}
              </Box>
            </CustomPopover>
            {links.map(link => (
              <Link href={link.href} key={link.href} style={classes.link}>
                {link.label}
              </Link>
            ))}
          </>
        )}
        {isSignIn && (
          <Link href="/sign-up">
            <Button>Log in / Sign up</Button>
          </Link>
        )}
      </Box>
    </header>
  );
};

export default Header;
