import Link from 'next/link';
import {
  Box,
  Divider,
  Menu as MUIMenu,
  MenuItem,
  MenuProps as MUIMenuProps,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import {
  AnalyticsOutlined,
  BookmarkBorderOutlined,
  ChatBubbleOutlineOutlined,
  Logout,
  SettingsOutlined,
} from '@mui/icons-material';
import { type FC, type CSSProperties } from 'react';
import Button from '@/components/common/Button';
import { links } from '..';
import getStyles from '../styles';
import CustomAccordion from '@/components/common/Accordion';
import { UserInterface } from '@/backend/services/users/interfaces/user.interface';
import UserAvatar from '@/components/common/UserAvatar';

type MenuClassesProp = SxProps<Theme> | undefined;

interface MenuProps extends MUIMenuProps {
  isShadow?: boolean;
  firstColumn: { href: string; value: string }[];
  secondColumn: { href: string; value: string }[];
  handleClickLink: (v: string) => void;
  user: UserInterface | null;
  isDesktop: boolean;
  handleClose: () => void;
}

const linkStyle = { textDecoration: 'none', outline: 'none' };

const menuProfileLinks = [
  {
    href: 'investments',
    label: 'Investments',
    icon: (style: MenuClassesProp) => <AnalyticsOutlined sx={style} />,
  },
  {
    href: 'reviews',
    label: 'My Reviews',
    icon: (style: MenuClassesProp) => <ChatBubbleOutlineOutlined sx={style} />,
  },
  {
    href: 'saved',
    label: 'Saved',
    icon: (style: MenuClassesProp) => <BookmarkBorderOutlined sx={style} />,
  },
  {
    href: 'settings',
    label: 'Profile Settings',
    icon: (style: MenuClassesProp) => <SettingsOutlined sx={style} />,
  },
];

export const Menu: FC<MenuProps> = ({
  isShadow,
  firstColumn,
  secondColumn,
  handleClickLink,
  user,
  isDesktop,
  handleClose,
  ...props
}) => {
  const classes = getStyles({ type: 'dark', isShadow });
  const { open, anchorEl } = { ...props };
  return (
    <>
      <MUIMenu
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
        {!!user ? (
          <Box>
            <Box sx={classes.mobileMenuHeader}>
              <UserAvatar
                src={user.profilePicture}
                width={36}
                height={36}
                name={`${user.firstName} ${user.lastName}`}
              />
              <Box sx={classes.mobileMenuHeaderTextWrapper}>
                <Typography variant="body1">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="caption">{user.email}</Typography>
              </Box>
            </Box>
            <Divider />
            {menuProfileLinks.map(({ href, label, icon }) => (
              <Link
                href={`profile?section=${href}`}
                passHref
                style={linkStyle}
                key={href}
              >
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
          !isDesktop && (
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
          )
        )}
        {!isDesktop && (
          <Box>
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
          </Box>
        )}
        {!!user && (
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
      </MUIMenu>
    </>
  );
};
