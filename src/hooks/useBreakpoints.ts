import { useMediaQuery } from '@mui/material';

interface BreakpointsReturnData {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useBreakpoints = (): BreakpointsReturnData => {
  const isMobile = useMediaQuery('(max-width:767px)');
  const isTablet = useMediaQuery('(max-width:1023px)');
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
