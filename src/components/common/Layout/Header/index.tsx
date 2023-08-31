import React, { useState } from 'react';
import Logo from '@/assets/components/Logo';
import getStyles from './styles';
import { Box } from '@mui/material';
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
import { MobileMenu } from './MobileMenu';
import { Menu } from './Menu';

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
  const [openCreateReviewForm, setOpenCreateReviewForm] = useState(false);
  const classes = getStyles({ type, isShadow });

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

  return (
    <Box
      component="header"
      sx={{
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
        {isDesktop && isLinks ? (
          <Menu
            type={type}
            isShadow={isShadow}
            firstColumn={firstColumn}
            secondColumn={secondColumn}
            handleClickLink={handleClickLink}
          />
        ) : (
          <MobileMenu
            isSignIn={isSignIn}
            isShadow={isShadow}
            firstColumn={firstColumn}
            secondColumn={secondColumn}
            handleClickLink={handleClickLink}
          />
        )}
        {isDesktop && isSignIn && (
          <Link href="/sign-up">
            <Button>Log in / Sign up</Button>
          </Link>
        )}
        <CreateReviewForm
          open={openCreateReviewForm}
          onClose={handleCloseCreateReviewForm}
        />
      </Box>
    </Box>
  );
};

export default Header;
