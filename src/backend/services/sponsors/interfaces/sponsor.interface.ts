import { DealInterface } from '../../deals/interfaces/deal.interface';
import { ReviewInterface } from '../../reviews/interfaces/review.interface';
import { UserInterface } from '../../users/interfaces/user.interface';
import { CreateSponsorInterface } from './create-sponsor.interface';

export interface SponsorInterface extends CreateSponsorInterface {
  id: number;
  admin?: UserInterface | null;
  deals?: DealInterface[];
  reviews?: ReviewInterface[];
  activelyRising: boolean;
  dealsCount?: number | 0;
  reviewsCount?: number | 0;
  avgTotalRating?: number | 0;
  isInBookmarks?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
