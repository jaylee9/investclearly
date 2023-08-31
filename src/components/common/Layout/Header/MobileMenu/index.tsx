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
  Logout,
  Menu as MenuIcon,
  SettingsOutlined,
} from '@mui/icons-material';
import { useState, type FC } from 'react';
import { links } from '../Menu';
import Button from '@/components/common/Button';

type MobileMenuClassesProp = SxProps<Theme> | undefined;

interface MobileMenuProps {
  classes: Record<string, MobileMenuClassesProp>;
  isSignIn?: boolean;
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

export const MobileMenu: FC<MobileMenuProps> = ({ classes, isSignIn }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          <>
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
                  {label}
                </MenuItem>
              </Link>
            ))}
          </>
        ) : (
          <Button
            style={{
              width: 'calc(100% - 24px)',
              margin: '0 auto 12px',
              display: 'block',
            }}
          >
            Log in / Sign up
          </Button>
        )}
        <Divider />
        {links.map(({ href, label }) => (
          <Link href={href} passHref style={linkStyle} key={href}>
            <MenuItem
              onClick={handleClose}
              disableRipple
              sx={classes.mobileMenuItem}
            >
              {label}
            </MenuItem>
          </Link>
        ))}
        {isSignIn && (
          <>
            <Divider />
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
          </>
        )}
      </Menu>
    </>
  );
};
