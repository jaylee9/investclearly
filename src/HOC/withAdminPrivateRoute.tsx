import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { ADMIN_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';

interface WithAdminPrivateRouteProps {
  children?: ReactNode;
}

export const withAdminPrivateRoute = <P extends object>(
  WrappedComponent: NextPage<P>
): NextPage<P & WithAdminPrivateRouteProps> => {
  const Wrapper: NextPage<P & WithAdminPrivateRouteProps> = props => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const admin =
        typeof window !== 'undefined' &&
        localStorage.getItem(ADMIN_OBJECT_LOCALSTORAGE_KEY);
      if (!admin) {
        router.replace('/admin-panel/login');
      } else {
        setIsAdmin(true);
      }
    }, [router]);

    return isAdmin ? <WrappedComponent {...(props as P)} /> : null;
  };

  return Wrapper;
};

export default withAdminPrivateRoute;
