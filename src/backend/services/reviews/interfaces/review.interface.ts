import { AttachmentInterface } from '../../attachments/interfaces/attachment-interface';
import { DealInterface } from '../../deals/interfaces/deal.interface';
import { SponsorInterface } from '../../sponsors/interfaces/sponsor.interface';
import { UserInterface } from '../../users/interfaces/user.interface';
import { CreateReviewInterface } from './create-review.interface';

export interface ReviewInterface extends CreateReviewInterface {
  id: number;
  sponsor?: SponsorInterface | null;
  deal?: DealInterface | null;
  reviewer?: UserInterface | null;
  attachments: AttachmentInterface[];
  status: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
