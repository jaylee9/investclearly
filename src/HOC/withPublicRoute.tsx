import { NextPage, NextPageContext } from 'next';
import { parse } from 'cookie';
import { ReactNode } from 'react';

interface WithPublicRouteProps {
  children?: ReactNode;
}

export const withPublicRoute = <P extends object>(
  WrappedComponent: NextPage<P>
): NextPage<P & WithPublicRouteProps> => {
  const Wrapper: NextPage<P & WithPublicRouteProps> = props => {
    return <WrappedComponent {...(props as P)} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = parse(ctx.req?.headers.cookie || '');

    if (cookies.accessToken) {
      ctx.res?.writeHead(302, { Location: '/' });
      ctx.res?.end();
      return {} as P;
    }

    let componentProps = {} as P;
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }

    return componentProps;
  };

  return Wrapper;
};

export default withPublicRoute;
