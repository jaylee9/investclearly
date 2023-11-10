import { AttachmentInterface } from '../../attachments/interfaces/attachment-interface';
import { LocationInterface } from '../../locations/interfaces/location.interface';
import { ReviewInterface } from '../../reviews/interfaces/review.interface';
import { SponsorInterface } from '../../sponsors/interfaces/sponsor.interface';

export interface DealInterface {
  id: number;
  fileDate: Date;
  isDealPublished: boolean;
  vanityName: string;
  dealAddress: string;
  regions: string | string[];
  status: string;
  assetClass: string;
  description: string;
  minimumInvestment: number;
  cashOnCash: number;
  investmentStructures: string | string[];
  fees: number | null;
  targetRaise: number;
  equityMultiple: number | null;
  holdPeriod: number;
  targetIRR: number | null;
  actualIRR: number | null;
  preferredReturn: number;
  dealLegalName: string;
  dealSponsor: string;
  exemption: string;
  secIndustry: string;
  closeDate: Date;
  regulation: string;
  sponsor?: SponsorInterface | null;
  attachments: AttachmentInterface[];
  locations: LocationInterface[];
  reviews?: ReviewInterface[];
  reviewsCount?: number | 0;
  avgTotalRating?: number | 0;
  isInInvestments?: boolean;
  isInBookmarks?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
