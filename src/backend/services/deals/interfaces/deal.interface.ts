import { CreateDealInterface } from './create-deal.interface';

export interface DealInterface extends CreateDealInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
