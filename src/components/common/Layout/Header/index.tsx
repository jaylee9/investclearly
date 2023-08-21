import React, { useState } from 'react';
import Logo from '@/assets/components/Logo';
import getStyles from './styles';
import { Box } from '@mui/material';
import Link from 'next/link';
import Button from '@/components/common/Button';
import CustomPopover from '@/components/common/Popover';
import { TLinks } from '@/types/common';
import { HeaderProps } from '@/hooks/useHeaderProps';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import GlobalSearch, {
  GlobalSearchVariant,
} from '@/components/page/Home/GlobalSearch';
import escapeStringForHttpParams from '@/helpers/escapeStringForHttpParams';

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
  onChangeSearch,
  isSticky,
}: HeaderProps) => {
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const classes = getStyles({ type, isShadow });
  const handleChangeSearch = (value: string) => {
    if (onChangeSearch) {
      onChangeSearch(value);
    }
  };

  const handleArrowClick = () => {
    setIsArrowRotated(!isArrowRotated);
  };
  const assetClassesArray = [
    ...Object.keys(AssetClasses).map(key => {
      const value = AssetClasses[key as keyof typeof AssetClasses];
      const linkValue = escapeStringForHttpParams(value);
      const href = `/list?type=deals&asset_class=${linkValue}`;
      return { value, href };
    }),
    { value: 'All Deals', href: '/list?type=deals' },
  ];
  const columnLength = Math.ceil(assetClassesArray.length / 2);
  const firstColumn = assetClassesArray.slice(0, columnLength);
  const secondColumn = assetClassesArray.slice(columnLength);
  return (
    <header
      style={{
        ...classes.root,
        position: isSticky ? 'sticky' : 'initial',
        top: 0,
        right: 0,
        width: '100%',
      }}
    >
      {!!content && content}
      <Box sx={classes.leftSideWrapper}>
        <Logo variant={logoVariant} />
        {isSearch && (
          <GlobalSearch
            variant={GlobalSearchVariant.BASE}
            onChangeSearch={handleChangeSearch}
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
                      onClick={() => setIsArrowRotated(false)}
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
                      onClick={() => setIsArrowRotated(false)}
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
