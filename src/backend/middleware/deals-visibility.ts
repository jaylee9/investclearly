import { Roles } from '../constants/enums/roles';
import { User } from '../entities/user.entity';

export const dealsVisibilityMiddleware = (user?: User | null) => {
  let showOnlyPublishedDeals = true;

  if (user && user.role === Roles.admin) {
    showOnlyPublishedDeals = false;
  }

  return showOnlyPublishedDeals;
};
