import { PaginationResultConstants } from '../../constants/pagination-result-constants';
import { TPaginationInfo } from './paginate-info.type';

export const buildPaginationInfo = (
  total: number,
  page: number,
  size: number
): TPaginationInfo => {
  const lastPage = Math.ceil((total || 1) / size);
  return {
    total: total || PaginationResultConstants.total,
    currentPage: +page || PaginationResultConstants.currentPage,
    nextPage:
      +page + 1 > +lastPage
        ? 1
        : +page + 1 || PaginationResultConstants.nextPage,
    prevPage:
      +page - 1 < 1 ? 1 : +page - 1 || PaginationResultConstants.prevPage,
    lastPage: lastPage || PaginationResultConstants.lastPage,
  };
};
