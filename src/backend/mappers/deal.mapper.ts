import { Deal } from '../entities/deals.entity';
import { DealInterface } from '../services/deals/interfaces/deal.interface';
import { attachmentMapper } from './attachment.mapper';
import { locationMapper } from './locations.mapper';
import { reviewMapper } from './review.mapper';
import { sponsorMapper } from './sponsor.mapper';

export const dealMapper = (deal: Deal): DealInterface => {
  return {
    id: deal.id,
    dealTitle: deal.dealTitle,
    dealAddress: deal.dealAddress,
    regions: deal.regions || [],
    status: deal.status,
    assetClass: deal.assetClass,
    description: deal.description,
    minimumInvestment: deal.minimumInvestment,
    cashOnCash: deal.cashOnCash,
    investmentStructures: deal.investmentStructures,
    fees: deal.fees,
    targetRaise: deal.targetRaise,
    equityMultiple: deal.equityMultiple,
    holdPeriod: deal.holdPeriod,
    targetIRR: deal.targetIRR,
    actualIRR: deal.actualIRR,
    preferredReturn: deal.preferredReturn,
    dealLegalName: deal.dealLegalName,
    dealSponsor: deal.dealSponsor,
    exemption: deal.exemption,
    sponsor: deal.sponsor ? sponsorMapper(deal.sponsor) : null,
    attachments: deal.attachments ? deal.attachments.map(attachmentMapper) : [],
    locations: deal.locations ? deal.locations.map(locationMapper) : [],
    reviews: deal.reviews ? deal.reviews.map(reviewMapper) : [],
    reviewsCount: deal.reviewsCount || 0,
    avgTotalRating: deal.avgTotalRating || 0,
    secIndustry: deal.secIndustry,
    closeDate: deal.closeDate,
    regulation: deal.regulation,
    isInInvestments: deal.isInInvestments || false,
    isInBookmarks: deal.isInBookmarks || false,
    fileDate: deal.fileDate,
    isDealPublished: deal.isDealPublished,
    createdAt: deal.createdAt,
    updatedAt: deal.updatedAt,
  };
};
