import { Sponsor } from '../entities/sponsors.entity';
import { SponsorInterface } from '../services/sponsors/interfaces/sponsor.interface';
import { buildFullImagePath } from '../utils/build-full-image-path';
import { dealMapper } from './deal.mapper';
import { locationMapper } from './locations.mapper';
import { reviewMapper } from './review.mapper';
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
    specialties: sponsor.specialties || [],
    investmentStructures: sponsor.investmentStructures || [],
    facebookLink: sponsor.facebookLink || null,
    linkedInLink: sponsor.linkedInLink || null,
    twitterLink: sponsor.twitterLink || null,
    instagramLink: sponsor.instagramLink || null,
    exemptions: sponsor.exemptions || [],
    workForThisCompany: sponsor.workForThisCompany || false,
    regions: sponsor.regions || [],
    cashOnCash: sponsor.cashOnCash || null,
    fees: sponsor.fees || null,
    equityMultiple: sponsor.equityMultiple || null,
    holdPeriod: sponsor.holdPeriod || null,
    targetIRR: sponsor.targetIRR || null,
    actualIRR: sponsor.actualIRR || null,
    regulations: sponsor.regulations || [],
    interests: sponsor.interests || [],
    admin: sponsor.user ? userMapper(sponsor.user) : null,
    deals: sponsor.deals ? sponsor.deals.map(dealMapper) : [],
    activelyRising: sponsor.activelyRising || false,
    dealsCount: sponsor.dealsCount || 0,
    reviewsCount: sponsor.reviewsCount || 0,
    avgTotalRating: sponsor.avgTotalRating || 0,
    reviews: sponsor.reviews ? sponsor.reviews.map(reviewMapper) : [],
    locations: sponsor.locations ? sponsor.locations.map(locationMapper) : [],
    isInBookmarks: sponsor.isInBookmarks || false,
    createdAt: sponsor.createdAt,
    updatedAt: sponsor.updatedAt,
  };
};
