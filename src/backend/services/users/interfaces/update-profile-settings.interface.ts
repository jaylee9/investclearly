import { Regions } from '../../../../backend/constants/enums/regions';
import { AssetClasses } from '../../../../backend/constants/enums/asset-classes';
import { IncomeAndNetWorth } from '../../../../backend/constants/enums/income-and-worth';
import { InvestorStatuses } from '../../../../backend/constants/enums/investor-statuses';

export interface UpdateProfileSettingsInterface {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  address?: string;
  street1?: string;
  street2?: string;
  city?: string;
  stateOrCountry?: string;
  stateOrCountryDescription?: string;
  zipCode?: string;
  totalInvestedAmountVisibility: boolean;
  yourDealsVisibility: boolean;
  weeklyDigestEmail: boolean;
  reviewWasPublishedAfterModerationEmail: boolean;
  reviewWasDeclinedAfterModerationEmail: boolean;
  newDealMathingYourInvestmentPreferencesEmail: boolean;
  newDealFromTheSponsorYouSavedEmail: boolean;
  newReviewHasBeenSharedToSponsorEmail: boolean;
  investorStatus?: InvestorStatuses;
  incomeAndNetWorth?: IncomeAndNetWorth;
  assetClasses: AssetClasses[] | AssetClasses;
  regions: Regions[] | Regions;
  minimumInvestmentMin: number;
  minimumInvestmentMax: number;
  holdPeriodMin: number;
  holdPeriodMax: number;
}
