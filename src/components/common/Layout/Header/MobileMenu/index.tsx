import Link from 'next/link';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import {
  AnalyticsOutlined,
  BookmarkBorderOutlined,
  ChatBubbleOutlineOutlined,
  KeyboardArrowDown,
  Logout,
  Menu as MenuIcon,
  SettingsOutlined,
} from '@mui/icons-material';
import { useState, type FC, type CSSProperties } from 'react';
import Button from '@/components/common/Button';
import { links } from '..';
import getStyles from '../styles';
import CustomAccordion from '@/components/common/Accordion';

type MobileMenuClassesProp = SxProps<Theme> | undefined;

interface MobileMenuProps {
  isSignIn?: boolean;
  isShadow?: boolean;
  firstColumn: { href: string; value: string }[];
  secondColumn: { href: string; value: string }[];
  handleClickLink: (v: string) => void;
}

const linkStyle = { textDecoration: 'none', outline: 'none' };

const mobileMenuProfileLinks = [
  {
    href: '/investments',
    label: 'Investments',
    icon: (style: MobileMenuClassesProp) => <AnalyticsOutlined sx={style} />,
  },
  {
    href: '/my-reviews',
    label: 'My Reviews',
    icon: (style: MobileMenuClassesProp) => (
      <ChatBubbleOutlineOutlined sx={style} />
    ),
  },
  {
    href: '/saved',
    label: 'Saved',
    icon: (style: MobileMenuClassesProp) => (
      <BookmarkBorderOutlined sx={style} />
    ),
  },
  {
    href: '/profile-settings',
    label: 'Profile Settings',
    icon: (style: MobileMenuClassesProp) => <SettingsOutlined sx={style} />,
  },
];

export const MobileMenu: FC<MobileMenuProps> = ({
  isSignIn,
  isShadow,
  firstColumn,
  secondColumn,
  handleClickLink,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = getStyles({ type: 'dark', isShadow });

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        open={open}
        elevation={0}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={classes.mobileMenu}
      >
        {isSignIn ? (
          <Box>
            <Box sx={classes.mobileMenuHeader}>
              <Avatar sx={classes.mobileMenuHeaderAvatar} />
              <Box sx={classes.mobileMenuHeaderTextWrapper}>
                <Typography variant="body1">Ian Helssion</Typography>
                <Typography variant="caption">
                  ian.helsion@cloud.invest
                </Typography>
              </Box>
            </Box>
            <Divider />
            {mobileMenuProfileLinks.map(({ href, label, icon }) => (
              <Link href={href} passHref style={linkStyle} key={href}>
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  sx={classes.mobileMenuProfileItem}
                >
                  {icon(classes.mobileMenuIcon)}
                  <Typography variant="body1" sx={classes.mobileMenuText}>
                    {label}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>
        ) : (
          <Link href="/sign-up">
            <Button
              style={{
                width: 'calc(100% - 24px)',
                margin: '0 auto 12px',
                display: 'flex',
              }}
            >
              Log in / Sign up
            </Button>
          </Link>
        )}
        <Divider />
        <CustomAccordion
          label={'Deals'}
          expandIcon={
            <i className={'icon-Caret-down'} style={classes.arrow}></i>
          }
          customStyles={classes.dealsCustomAccordion}
        >
          {[...firstColumn, ...secondColumn].map(({ href, value }) => (
            <Link
              href={href}
              key={value}
              style={
                value === 'All Deals'
                  ? ({
                      ...classes.dealsCustomAccordionPopoverItem,
                      ...classes.dealsLink,
                    } as CSSProperties)
                  : (classes.dealsCustomAccordionPopoverItem as CSSProperties)
              }
              onClick={handleClose}
            >
              {value}
            </Link>
          ))}
        </CustomAccordion>
        {links.map(({ type, label }) => (
          <MenuItem
            onClick={() => {
              handleClickLink(type);
              handleClose();
            }}
            disableRipple
            sx={classes.mobileMenuItem}
            key={type}
          >
            <Typography variant="body1" sx={classes.mobileMenuText}>
              {label}
            </Typography>
          </MenuItem>
        ))}
        {isSignIn && (
          <Box>
            <Divider sx={classes.mobileMenuLogOutDivider} />
            <Link href="/logout" passHref style={linkStyle}>
              <MenuItem
                onClick={handleClose}
                disableRipple
                sx={classes.mobileMenuLogOut}
              >
                <Logout sx={classes.mobileMenuIcon} />
                Log out
              </MenuItem>
            </Link>
          </Box>
        )}
      </Menu>
    </>
  );
};
