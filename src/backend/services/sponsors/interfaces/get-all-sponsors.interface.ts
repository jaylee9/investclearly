import { OrderDirectionConstants } from '../../../constants/order-direction-constants';
import { Regions } from '../../../constants/enums/regions';
import { AssetClasses } from '../../../constants/enums/asset-classes';

export interface FindAllSponsorsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  activelyRising?: string;
  primaryAssetClasses?: AssetClasses[] | AssetClasses;
  regionalFocus?: Regions[] | Regions;
  minRating?: number;
  maxRating?: number;
  search?: string;
  limit?: number;
  entityIds?: number[];
}
