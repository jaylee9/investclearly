import { Sponsor } from '../entities/sponsors.entity';
import { SponsorInterface } from '../services/sponsors/interfaces/sponsor.interface';
import { buildFullImagePath } from '../utils/build-full-image-path';
import { buildFullSponsorWebsitePath } from '../utils/build-full-sponsor-website-path';
import { dealMapper } from './deal.mapper';
import { locationMapper } from './locations.mapper';
import { reviewMapper } from './review.mapper';
import { userMapper } from './user.mapper';

export const sponsorMapper = (sponsor: Sponsor): SponsorInterface => {
  return {
    id: sponsor.id,
    vanityName: sponsor.vanityName,
    legalName: sponsor.legalName,
    userId: sponsor.userId,
    businessAvatar: sponsor.businessAvatar
      ? buildFullImagePath(sponsor.businessAvatar)
      : '',
    businessEmail: sponsor.businessEmail,
    businessPhone: sponsor.businessPhone,
    sponsorName: sponsor.sponsorName,
    address: sponsor.address,
    website: sponsor.website
      ? buildFullSponsorWebsitePath(sponsor.website)
      : '',
    description: sponsor.description,
    aum: sponsor.aum,
    specialties: sponsor.specialties || [],
    facebookLink: sponsor.facebookLink,
    linkedInLink: sponsor.linkedInLink,
    twitterLink: sponsor.twitterLink,
    instagramLink: sponsor.instagramLink,
    workForThisCompany: sponsor.workForThisCompany || false,
    regions: sponsor.regions || [],
    equityMultiple: sponsor.equityMultiple,
    averageIRR: sponsor.averageIRR,
    yearOfFoundation: sponsor.yearOfFoundation,
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
