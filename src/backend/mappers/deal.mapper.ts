import { Deal } from '../entities/deals.entity';
import { DealInterface } from '../services/deals/interfaces/deal.interface';
import { attachmentMapper } from './attachment.mapper';
import { reviewMapper } from './review.mapper';
import { sponsorMapper } from './sponsor.mapper';

export const dealMapper = (deal: Deal): DealInterface => {
  return {
    id: deal.id,
    dealTitle: deal.dealTitle || null,
    dealAddress: deal.dealAddress || null,
    regions: deal.regions || [],
    status: deal.status || null,
    assetClass: deal.assetClass || null,
    description: deal.description || null,
    minimumInvestment: deal.minimumInvestment || null,
    cashOnCash: deal.cashOnCash || null,
    investmentStructures: deal.investmentStructures || null,
    fees: deal.fees || null,
    targetRaise: deal.targetRaise || null,
    equityMultiple: deal.equityMultiple || null,
    holdPeriod: deal.holdPeriod || null,
    targetIRR: deal.targetIRR || null,
    actualIRR: deal.actualIRR || null,
    dealLegalName: deal.dealLegalName || null,
    dealSponsor: deal.dealSponsor || null,
    exemption: deal.exemption || null,
    sponsor: deal.sponsor ? sponsorMapper(deal.sponsor) : null,
    attachments: deal.attachments ? deal.attachments.map(attachmentMapper) : [],
    reviews: deal.reviews ? deal.reviews.map(reviewMapper) : [],
    reviewsCount: deal.reviewsCount || 0,
    avgTotalRating: deal.avgTotalRating || 0,
    secIndustry: deal.secIndustry || null,
    closeDate: deal.closeDate || null,
    regulation: deal.regulation || null,
    isInInvestments: deal.isInInvestments || false,
    createdAt: deal.createdAt,
    updatedAt: deal.updatedAt,
  };
};
