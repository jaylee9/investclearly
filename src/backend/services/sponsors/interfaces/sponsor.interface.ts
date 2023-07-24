import { CreateSponsorInterface } from './create-sponsor.interface';

export interface SponsorInterface extends CreateSponsorInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
