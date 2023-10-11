import { LogoVariant } from '@/assets/components/Logo';
import { ReactNode } from 'react';

export type HeaderType = 'dark' | 'light' | 'search-dark' | 'search-light';

export interface HeaderProps {
  type?: HeaderType;
  isSearch?: boolean;
  content?: ReactNode | null;
  title?: ReactNode | string | null;
  isLogo?: boolean;
  isLinks?: boolean;
  isSignIn?: boolean;
  isShadow?: boolean;
  isShadowInFront?: boolean;
  logoVariant?: LogoVariant;
  onChangeSearch?: (searchTerm: string) => void;
  isSticky?: boolean;
  isDealAssetClasses?: boolean;
}

const useHeaderProps = (headerProps: HeaderProps = {}) => {
  const defaultHeaderProps: HeaderProps = {
    type: 'dark',
    isSearch: false,
    content: null,
    title: null,
    isLogo: true,
    isLinks: true,
    isSignIn: true,
    isShadow: true,
    isShadowInFront: false,
    isDealAssetClasses: true,
    logoVariant: LogoVariant.Default,
    onChangeSearch: undefined,
    isSticky: false,
  };
  const formattedHeaderProps = { ...defaultHeaderProps, ...headerProps };
  return formattedHeaderProps;
};

export default useHeaderProps;
