import { OrderDirectionConstants } from '../../../constants/order-direction-constants';
import { Regions } from '../../../constants/enums/regions';
import { AssetClasses } from '../../../constants/enums/asset-classes';

export interface FindAllSponsorsInterface {
  pageSize?: number;
  page?: number;
  orderDirection?: OrderDirectionConstants;
  activelyRaising?: string;
  primaryAssetClasses?: AssetClasses[];
  regionalFocus?: Regions[];
}
