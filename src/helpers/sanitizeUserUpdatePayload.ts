import { pick } from 'lodash';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';

const sanitizeUserUpdatePayload = (
  obj: PublicUserInterface
): Partial<PublicUserInterface> => {
  const validKeys = [
    'regions',
    'firstName',
    'lastName',
    'profilePicture',
    'address',
    'totalInvestedAmountVisibility',
    'yourDealsVisibility',
    'weeklyDigestEmail',
    'reviewWasPublishedAfterModerationEmail',
    'reviewWasDeclinedAfterModerationEmail',
    'newDealMathingYourInvestmentPreferencesEmail',
    'newDealFromTheSponsorYouSavedEmail',
    'newReviewHasBeenSharedToSponsorEmail',
    'investorStatus',
    'incomeAndNetWorth',
    'assetClasses',
    'regions',
    'minimumInvestmentMin',
    'minimumInvestmentMax',
    'holdPeriodMin',
    'holdPeriodMax',
  ];

  return pick(obj, validKeys);
};

export default sanitizeUserUpdatePayload;
