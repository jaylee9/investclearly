import { ClaimEntityTypes } from '../../../constants/enums/claim-entity-types';
import { ClaimTypes } from '../../../constants/enums/claim-types';

export interface CreateClaimRequestInterface {
  entityId: number;
  entityType: ClaimEntityTypes;
  claimType: ClaimTypes;
  businessEmail: string;
  businessPhone: string;
  jobTitle: string;
  message: string;
}
