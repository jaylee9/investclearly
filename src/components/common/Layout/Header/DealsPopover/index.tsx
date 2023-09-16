import Link from 'next/link';
import { useState, type FC } from 'react';
import { Box, Typography } from '@mui/material';
import CustomPopover from '@/components/common/Popover';
import { HeaderType } from '@/hooks/useHeaderProps';
import getStyles from '../styles';
import { links } from '..';

interface DealsPopoverProps {
  type?: HeaderType;
  isShadow?: boolean;
  firstColumn: { href: string; value: string }[];
  secondColumn: { href: string; value: string }[];
  handleClickLink: (v: string) => void;
}

export const DealsPopover: FC<DealsPopoverProps> = ({
  type,
  isShadow,
  firstColumn,
  secondColumn,
  handleClickLink,
}) => {
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
      {links.map(({ type, label }) => (
        <Typography
          variant="body1"
          key={type}
          sx={classes.link}
          onClick={() => handleClickLink(type)}
        >
          {label}
        </Typography>
      ))}
    </>
  );
};
