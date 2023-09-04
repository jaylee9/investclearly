import { useMediaQuery } from '@mui/material';

interface BreakpointsReturnData {
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

export const useBreakpoints = (): BreakpointsReturnData => {
  const isSmallMobile = useMediaQuery('(max-width:375px)');
  const isMobile = useMediaQuery('(max-width:767px)');
  const isTablet = useMediaQuery('(max-width:1023px)');
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const isLargeDesktop = useMediaQuery('(min-width:1376px)');

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};
