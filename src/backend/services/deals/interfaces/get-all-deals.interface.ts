import { AssetClasses } from '../../../constants/enums/asset-classes';
import { OrderDirectionConstants } from '../../../constants/order-direction-constants';
import { Regions } from '../../../constants/enums/regions';
import { DealStatuses } from '../../../constants/enums/deal-statuses';
import { InvestmentStructures } from '../../../constants/enums/investment-structures';
import { Exemptions } from '../../../constants/enums/exemptions';

export interface FindAllDealsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  assetClasses?: AssetClasses[] | AssetClasses;
  statuses?: DealStatuses[] | DealStatuses;
  regions?: Regions[] | Regions;
  investmentStructures?: InvestmentStructures[] | InvestmentStructures;
  IRRMin?: number;
  IRRMax?: number;
  investmentMinValue?: number;
  investmentMaxValue?: number;
  exemptions?: Exemptions[] | Exemptions;
  sponsorFeesMin?: number;
  sponsorFeesMax?: number;
  search?: string;
  limit?: number;
}
