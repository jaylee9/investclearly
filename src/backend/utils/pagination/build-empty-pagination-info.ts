import { RangeDataConstants } from '../../constants/range-data-constants';
import { PaginationResultConstants } from '../../constants/pagination-result-constants';
import { DealConstants } from '../../../backend/constants/deal-constants';

export const buildEmptyPaginationInfo = (entity: string) => {
  if (entity === DealConstants.deals) {
    return {
      [entity]: [],
      rangeData: { ...RangeDataConstants },
      ...PaginationResultConstants,
    };
  } else {
    return {
      [entity]: [],
      ...PaginationResultConstants,
    };
  }
};
