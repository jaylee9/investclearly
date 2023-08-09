import { ReviewInterface } from '../../reviews/interfaces/review.interface';
import { UserInterface } from './user.interface';
import { AssetClasses } from '../../../../backend/constants/enums/asset-classes';
import { Regions } from '../../../../backend/constants/enums/regions';

export interface PublicUserInterface extends UserInterface {
  reviews?: ReviewInterface[] | null;
  address?: string;
  totalInvestedAmountVisibility: boolean;
  yourDealsVisibility: boolean;
  weeklyDigestEmail: boolean;
  reviewWasPublishedAfterModerationEmail: boolean;
  reviewWasDeclinedAfterModerationEmail: boolean;
  newDealMathingYourInvestmentPreferencesEmail: boolean;
  newDealFromTheSponsorYouSavedEmail: boolean;
  newReviewHasBeenSharedToSponsorEmail: boolean;
  investorStatus: string;
  incomeAndNetWorth: string;
  assetClasses: AssetClasses[];
  regions: Regions[];
  minimumInvestmentMin: number;
  minimumInvestmentMax: number;
  holdPeriodMin: number;
  holdPeriodMax: number;
}
