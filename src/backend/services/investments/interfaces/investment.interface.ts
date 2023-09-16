import { DealInterface } from '../../deals/interfaces/deal.interface';
import { PublicUserInterface } from '../../users/interfaces/public-user.interface';
import { CreateInvestmentInterface } from './create-investment.interface';

export interface InvestmentInterface extends CreateInvestmentInterface {
  id: number;
  userId: number;
  user: PublicUserInterface;
  deal: DealInterface;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
