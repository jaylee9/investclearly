import { Deal } from '../entities/deals.entity';
import { DealInterface } from '../services/deals/interfaces/deal.interface';
import { attachmentMapper } from './attachment.mapper';
import { sponsorMapper } from './sponsor.mapper';

export const dealMapper = (deal: Deal): DealInterface => {
  return {
    id: deal.id,
    dealTitle: deal.dealTitle || null,
    dealAddress: deal.dealAddress || null,
    region: deal.region || null,
    status: deal.status || null,
    assetClass: deal.assetClass || null,
    description: deal.description || null,
    minimumInvestment: deal.minimumInvestment || null,
    cashOnCash: deal.cashOnCash || null,
    investmentStructure: deal.investmentStructure || null,
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
    createdAt: deal.createdAt,
    updatedAt: deal.updatedAt,
  };
};
