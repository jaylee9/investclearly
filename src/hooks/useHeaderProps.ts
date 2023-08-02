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
  logoVariant?: LogoVariant;
  onChangeSearch?: (searchTerm: string) => void;
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
    logoVariant: LogoVariant.Default,
    onChangeSearch: undefined,
  };
  const formattedHeaderProps = { ...defaultHeaderProps, ...headerProps };
  return formattedHeaderProps;
};

export default useHeaderProps;
