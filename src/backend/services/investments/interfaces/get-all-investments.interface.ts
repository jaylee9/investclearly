import { OrderDirectionConstants } from '../../../constants/order-direction-constants';
import { InvestmentStatuses } from '../../../../backend/constants/enums/investment-statuses';

export interface FindAllInvestmentsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  status?: InvestmentStatuses;
  search?: string;
}
