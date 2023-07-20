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
  assetClasses?: AssetClasses[];
  statuses?: DealStatuses[];
  regions?: Regions[];
  investmentStructures?: InvestmentStructures[];
  IRRMin?: number;
  IRRMax?: number;
  investmentMinValue?: number;
  investmentMaxValue?: number;
  exemptions?: Exemptions[];
  sponsorFeesMin?: number;
  sponsorFeesMax?: number;
}
