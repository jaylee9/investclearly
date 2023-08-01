import { Sponsor } from '../entities/sponsors.entity';
import { SponsorInterface } from '../services/sponsors/interfaces/sponsor.interface';
import { buildFullImagePath } from '../utils/build-full-image-path';
import { dealMapper } from './deal.mapper';
import { userMapper } from './user.mapper';

export const sponsorMapper = (sponsor: Sponsor): SponsorInterface => {
  return {
    id: sponsor.id,
    vanityName: sponsor.vanityName || null,
    legalName: sponsor.legalName || null,
    userId: sponsor.userId || null,
    businessAvatar: sponsor.businessAvatar
      ? buildFullImagePath(sponsor.businessAvatar)
      : null,
    businessEmail: sponsor.businessEmail || null,
    businessPhone: sponsor.businessPhone || null,
    sponsorName: sponsor.sponsorName || null,
    address: sponsor.address || null,
    website: sponsor.website || null,
    description: sponsor.description || null,
    aum: sponsor.aum || null,
    specialty: sponsor.specialty || null,
    investmentStructure: sponsor.investmentStructure ?? null,
    facebookLink: sponsor.facebookLink || null,
    linkedInLink: sponsor.linkedInLink || null,
    twitterLink: sponsor.twitterLink || null,
    instagramLink: sponsor.instagramLink || null,
    exemption: sponsor.exemption || null,
    workForThisCompany: sponsor.workForThisCompany || false,
    region: sponsor.region || null,
    cashOnCash: sponsor.cashOnCash || null,
    fees: sponsor.fees || null,
    equityMultiple: sponsor.equityMultiple || null,
    holdPeriod: sponsor.holdPeriod || null,
    targetIRR: sponsor.targetIRR || null,
    actualIRR: sponsor.actualIRR || null,
    admin: sponsor.user ? userMapper(sponsor.user) : null,
    deals: sponsor.deals ? sponsor.deals.map(dealMapper) : [],
    activelyRaising: sponsor.activelyRaising || false,
    dealsCount: sponsor.dealscount || 0,
    createdAt: sponsor.createdAt,
    updatedAt: sponsor.updatedAt,
  };
};
