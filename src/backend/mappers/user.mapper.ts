import { User } from '../entities/user.entity';
import { PublicUserInterface } from '../services/users/interfaces/public-user.interface';
import { buildFullImagePath } from '../utils/build-full-image-path';
import { investmentMapper } from './investment.mapper';
import { locationMapper } from './locations.mapper';
import { reviewMapper } from './review.mapper';

export const userMapper = (user: User): PublicUserInterface => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture
      ? buildFullImagePath(user.profilePicture)
      : null,
    googleId: user.googleId,
    address: user.address,
    totalInvestedAmountVisibility: user.totalInvestedAmountVisibility,
    yourDealsVisibility: user.yourDealsVisibility,
    weeklyDigestEmail: user.weeklyDigestEmail,
    reviewWasPublishedAfterModerationEmail:
      user.reviewWasPublishedAfterModerationEmail,
    reviewWasDeclinedAfterModerationEmail:
      user.reviewWasDeclinedAfterModerationEmail,
    newDealMathingYourInvestmentPreferencesEmail:
      user.newDealMathingYourInvestmentPreferencesEmail,
    newDealFromTheSponsorYouSavedEmail: user.newDealFromTheSponsorYouSavedEmail,
    newReviewHasBeenSharedToSponsorEmail:
      user.newReviewHasBeenSharedToSponsorEmail,
    investorStatus: user.investorStatus,
    incomeAndNetWorth: user.incomeAndNetWorth,
    assetClasses: user.assetClasses,
    regions: user.regions,
    minimumInvestmentMin: user.minimumInvestmentMin,
    minimumInvestmentMax: user.minimumInvestmentMax,
    holdPeriodMin: user.holdPeriodMin,
    holdPeriodMax: user.holdPeriodMax,
    reviews: user.reviews ? user.reviews.map(reviewMapper) : [],
    reviewsCount: user.reviewsCount || 0,
    investments: user.investments ? user.investments.map(investmentMapper) : [],
    locations: user.locations ? user.locations.map(locationMapper) : [],
    investmentsCount: user.investmentsCount || 0,
    isPasswordAdded: user.password !== null,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
