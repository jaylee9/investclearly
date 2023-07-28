import { AttachmentInterface } from '../../attachments/interfaces/attachment-interface';
import { SponsorInterface } from '../../sponsors/interfaces/sponsor.interface';
import { CreateDealInterface } from './create-deal.interface';

export interface DealInterface extends CreateDealInterface {
  id: number;
  sponsor?: SponsorInterface | null;
  attachments: AttachmentInterface[];
  createdAt: Date;
  updatedAt: Date;
}
