import { ReviewStatuses } from '../../../../backend/constants/enums/review-statuses';
import { OrderDirectionConstants } from '../../../constants/order-direction-constants';

export interface FindAllReviewsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  statuses?: ReviewStatuses[] | ReviewStatuses;
  userId?: number;
  search?: string;
}
