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
import { AssetClasses } from '@/backend/constants/enums/asset-classes';

const links: TLinks = [
  { href: '/review', label: 'Write a Review' },
  { href: '/sponsor-profile', label: 'Claim Sponsor Profile' },
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
  const assetClassesArray = [
    ...Object.keys(AssetClasses).map(key => {
      const value = AssetClasses[key as keyof typeof AssetClasses];
      const href = value.replace(/[\s']/g, '_').toLowerCase();
      return { value, href };
    }),
    { value: 'All Deals', href: '/deals' },
  ];
  const columnLength = Math.ceil(assetClassesArray.length / 2);
  const firstColumn = assetClassesArray.slice(0, columnLength);
  const secondColumn = assetClassesArray.slice(columnLength);
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
                <Box sx={classes.column}>
                  {firstColumn.map(item => (
                    <Link
                      href={item.href}
                      key={item.value}
                      style={classes.popoverItem}
                    >
                      {item.value}
                    </Link>
                  ))}
                </Box>
                <Box sx={classes.column}>
                  {secondColumn.map(item => (
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
