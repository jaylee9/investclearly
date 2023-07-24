import { SponsorInterface } from '../../sponsors/interfaces/sponsor.interface';
import { CreateDealInterface } from './create-deal.interface';

export interface DealInterface extends CreateDealInterface {
  id: number;
  sponsor: SponsorInterface | null;
  createdAt: Date;
  updatedAt: Date;
}
