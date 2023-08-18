import { AssetClasses } from '../../../constants/enums/asset-classes';
import { OrderDirectionConstants } from '../../../constants/order-direction-constants';
import { Regions } from '../../../constants/enums/regions';
import { DealStatuses } from '../../../constants/enums/deal-statuses';
import { InvestmentStructures } from '../../../constants/enums/investment-structures';
import { Exemptions } from '../../../constants/enums/exemptions';
import { Regulations } from '../../../../backend/constants/enums/regulations';

export interface FindAllDealsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  assetClasses?: AssetClasses[] | AssetClasses;
  statuses?: DealStatuses[] | DealStatuses;
  regions?: Regions[] | Regions;
  investmentStructures?: InvestmentStructures[] | InvestmentStructures;
  targetIRRMin?: number;
  targetIRRMax?: number;
  actualIRRMin?: number;
  actualIRRMax?: number;
  investmentMinValue?: number;
  investmentMaxValue?: number;
  exemptions?: Exemptions[] | Exemptions;
  sponsorFeesMin?: number;
  sponsorFeesMax?: number;
  minRating?: number;
  maxRating?: number;
  sponsorId?: number;
  regulations?: Regulations[] | Regulations;
  search?: string;
  limit?: number;
  entityIds?: number[];
  currentUserId?: number;
}
