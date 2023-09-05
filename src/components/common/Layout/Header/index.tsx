import React, { useEffect, useState } from 'react';
import Logo from '@/assets/components/Logo';
import getStyles from './styles';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { TModalHandlers } from '@/types/common';
import { HeaderProps } from '@/hooks/useHeaderProps';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import GlobalSearch, {
  GlobalSearchVariant,
} from '@/components/page/Home/GlobalSearch';
import escapeStringForHttpParams from '@/helpers/escapeStringForHttpParams';
import CreateReviewForm from '../../CreateReview';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Menu } from './Menu';
import { DealsPopover } from './DealsPopover';
import { UserInterface } from '@/backend/services/users/interfaces/user.interface';
import UserAvatar from '../../UserAvatar';
import { Menu as MenuIcon } from '@mui/icons-material';

export const links: TModalHandlers = [
  { type: 'review', label: 'Write a Review' },
  { type: 'sponsor-profile', label: 'Claim Sponsor Profile' },
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
  const { isDesktop } = useBreakpoints();
  const classes = getStyles({ type, isShadow });
  const [openCreateReviewForm, setOpenCreateReviewForm] = useState(false);
  const [user, setUser] = useState<null | UserInterface>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeSearch = (value: string) => {
    if (onChangeSearch) {
      onChangeSearch(value);
    }
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

  const handleOpenCreateReviewForm = () => setOpenCreateReviewForm(true);
  const handleCloseCreateReviewForm = () => setOpenCreateReviewForm(false);

  const handleClickLink = (type: string) => {
    if (type === 'review') {
      handleOpenCreateReviewForm();
    }
  };

  useEffect(() => {
    const userData: UserInterface = JSON.parse(
      localStorage.getItem('user') || 'null'
    );
    setUser(userData);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        ...classes.root,
        position: isSticky
          ? 'sticky'
          : type?.toString().includes('light')
          ? 'absolute'
          : 'initial',
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
      <Box sx={classes.dealsPopover}>
        {isDesktop && isLinks && (
          <DealsPopover
            type={type}
            isShadow={isShadow}
            firstColumn={firstColumn}
            secondColumn={secondColumn}
            handleClickLink={handleClickLink}
          />
        )}
        {isDesktop ? (
          <>
            {isSignIn && user ? (
              <Box sx={classes.avatarWrapper} onClick={handleOpenMenu}>
                <UserAvatar
                  src={user.profilePicture as string}
                  width={44}
                  height={44}
                  name={`${user.firstName} ${user.lastName}`}
                />
              </Box>
            ) : (
              <Link href="/sign-up">
                <Button>Log in / Sign up</Button>
              </Link>
            )}
          </>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          isShadow={isShadow}
          firstColumn={firstColumn}
          secondColumn={secondColumn}
          handleClickLink={handleClickLink}
          user={user}
          isDesktop={isDesktop}
          anchorEl={anchorEl}
          handleClose={handleCloseMenu}
          open={openMenu}
        />
        <CreateReviewForm
          open={openCreateReviewForm}
          onClose={handleCloseCreateReviewForm}
        />
      </Box>
    </Box>
  );
};

export default Header;
