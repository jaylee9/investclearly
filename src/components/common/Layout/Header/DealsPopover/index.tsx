import Link from 'next/link';
import { useState, type FC } from 'react';
import { Box, Typography } from '@mui/material';
import CustomPopover from '@/components/common/Popover';
import { HeaderType } from '@/hooks/useHeaderProps';
import getStyles from '../styles';
import { links } from '..';
import Button from '@/components/common/Button';

interface DealsPopoverProps {
  type?: HeaderType;
  isShadow?: boolean;
  firstColumn: { href: string; value: string }[];
  secondColumn: { href: string; value: string }[];
  handleClickLink: (v: string) => void;
  isDealAssetClasses: boolean;
}

export const DealsPopover: FC<DealsPopoverProps> = ({
  type,
  isShadow,
  firstColumn,
  secondColumn,
  handleClickLink,
  isDealAssetClasses,
}) => {
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const classes = getStyles({ type, isShadow });

  const handleArrowClick = () => {
    setIsArrowRotated(!isArrowRotated);
  };

  return (
    <>
      {isDealAssetClasses && (
        <CustomPopover
          open={isArrowRotated}
          handleClose={() => setIsArrowRotated(false)}
          trigger={
            <Typography
              variant="body1"
              sx={classes.link}
              onClick={handleArrowClick}
            >
              Deals
              <i
                className={`icon-Caret-down ${isArrowRotated ? 'rotate' : ''}`}
                style={classes.arrow}
              ></i>
            </Typography>
          }
        >
          <Box sx={classes.popoverWrapper}>
            <Box sx={classes.column}>
              {firstColumn.map(item => (
                <Link
                  href={item.href}
                  key={item.value}
                  onClick={() => setIsArrowRotated(false)}
                >
                  <Typography variant="body1" sx={classes.popoverItem}>
                    {item.value}
                  </Typography>
                </Link>
              ))}
            </Box>
            <Box sx={classes.column}>
              {secondColumn.map(item => (
                <Link
                  href={item.href}
                  key={item.value}
                  onClick={() => setIsArrowRotated(false)}
                >
                  {item.value === 'All Deals' ? (
                    <Box sx={classes.popoverItem}>
                      <Button
                        variant="tertiary"
                        customStyles={{ padding: 0, blockSize: 'fit-content' }}
                      >
                        {item.value}
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body1" sx={classes.popoverItem}>
                      {item.value}
                    </Typography>
                  )}
                </Link>
              ))}
            </Box>
          </Box>
        </CustomPopover>
      )}
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
