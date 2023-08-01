import { OrderDirectionConstants } from '../../../constants/order-direction-constants';
import { Regions } from '../../../constants/enums/regions';
import { AssetClasses } from '../../../constants/enums/asset-classes';

export interface FindAllSponsorsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  activelyRising?: boolean;
  primaryAssetClasses?: AssetClasses[] | AssetClasses;
  regionalFocus?: Regions[] | Regions;
  search?: string;
  limit?: number;
}
