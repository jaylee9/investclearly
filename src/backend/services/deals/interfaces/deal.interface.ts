import { AttachmentInterface } from '../../attachments/interfaces/attachment-interface';
import { ReviewInterface } from '../../reviews/interfaces/review.interface';
import { SponsorInterface } from '../../sponsors/interfaces/sponsor.interface';
import { CreateDealInterface } from './create-deal.interface';

export interface DealInterface extends CreateDealInterface {
  id: number;
  sponsor?: SponsorInterface | null;
  attachments: AttachmentInterface[];
  reviews?: ReviewInterface[];
  reviewsCount?: number | 0;
  avgTotalRating?: number | 0;
  isInInvestments?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
