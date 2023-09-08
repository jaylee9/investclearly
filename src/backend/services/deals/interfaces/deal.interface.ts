import { AttachmentInterface } from '../../attachments/interfaces/attachment-interface';
import { LocationInterface } from '../../locations/interfaces/location.interface';
import { RelatedPersonInterface } from '../../relatedPersons/interfaces/related-person.interface';
import { ReviewInterface } from '../../reviews/interfaces/review.interface';
import { SponsorInterface } from '../../sponsors/interfaces/sponsor.interface';
import { CreateDealInterface } from './create-deal.interface';

export interface DealInterface extends CreateDealInterface {
  id: number;
  sponsor?: SponsorInterface | null;
  attachments: AttachmentInterface[];
  locations: LocationInterface[];
  relatedPersons: RelatedPersonInterface[];
  reviews?: ReviewInterface[];
  reviewsCount?: number | 0;
  avgTotalRating?: number | 0;
  isInInvestments?: boolean;
  isInBookmarks?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
