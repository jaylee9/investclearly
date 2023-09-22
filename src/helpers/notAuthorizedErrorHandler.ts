import { NextRouter } from 'next/router';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

interface ErrorHandlerParams {
  status: number;
  router: NextRouter;
  role: Roles;
}

const notAuthorizedErrorHandler = ({
  status,
  router,
  role,
}: ErrorHandlerParams) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem(role);
    router.replace(`${role === Roles.ADMIN && '/admin-panel'}/login`);
    return;
  }
};

export default notAuthorizedErrorHandler;
