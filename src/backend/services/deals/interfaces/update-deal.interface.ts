import { Exemptions } from '../../../../backend/constants/enums/exemptions';
import { InvestmentStructures } from '../../../../backend/constants/enums/investment-structures';

export interface UpdateDealInterface {
  vanityName: string;
  dealAddress: string;
  regions: string;
  status: string;
  assetClass: string;
  description: string;
  minimumInvestment: number;
  cashOnCash: number;
  investmentStructures: InvestmentStructures;
  fees: number;
  targetRaise: number;
  equityMultiple: number;
  holdPeriod: number;
  targetIRR: number;
  actualIRR: number;
  preferredReturn: number;
  dealLegalName: string;
  dealSponsor: string;
  exemption: Exemptions;
  attachmentsIdsToDelete: number[] | number;
  secIndustry: string;
  closeDate: Date;
  regulation: string;
  street1?: string | '';
  street2?: string | '';
  city?: string | '';
  stateOrCountry?: string | '';
  stateOrCountryDescription?: string | '';
  zipCode?: string | '';
  sponsorId: number;
  isDealPublished: boolean;
}
