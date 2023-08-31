import Link from 'next/link';
import { useState, type FC } from 'react';
import { Box } from '@mui/material';
import CustomPopover from '@/components/common/Popover';
import { HeaderType } from '@/hooks/useHeaderProps';
import type { TLinks } from '@/types/common';
import getStyles from '../styles';

interface MenuProps {
  type?: HeaderType;
  isShadow?: boolean;
}

export const links: TLinks = [
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

export const Menu: FC<MenuProps> = ({ type, isShadow }) => {
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const classes = getStyles({ type, isShadow });

  const handleArrowClick = () => {
    setIsArrowRotated(!isArrowRotated);
  };

  return (
    <>
      <CustomPopover
        open={isArrowRotated}
        handleClose={() => setIsArrowRotated(false)}
        trigger={
          <p style={classes.link} onClick={handleArrowClick}>
            <span>Deals</span>
            <i
              className={`icon-Caret-down ${isArrowRotated ? 'rotate' : ''}`}
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
  );
};
