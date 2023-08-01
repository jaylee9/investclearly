import { DealInterface } from '../../deals/interfaces/deal.interface';
import { UserInterface } from '../../users/interfaces/user.interface';
import { CreateSponsorInterface } from './create-sponsor.interface';

export interface SponsorInterface extends CreateSponsorInterface {
  id: number;
  admin?: UserInterface | null;
  deals?: DealInterface[] | [];
  activelyRaising: boolean;
  dealsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
