export interface CreateDealInterface {
  dealTitle?: string | null;
  dealAddress?: string | null;
  regions: string | string[];
  status: string | null;
  assetClass: string | null;
  description?: string | null;
  minimumInvestment?: number | null;
  cashOnCash?: number | null;
  investmentStructures: string | string[];
  fees?: number | null;
  targetRaise?: number | null;
  equityMultiple?: number | null;
  holdPeriod: number | null;
  targetIRR?: number | null;
  actualIRR?: number | null;
  dealLegalName?: string | null;
  dealSponsor?: string | null;
  exemption?: string | null;
  secIndustry?: string | null;
  closeDate?: Date | null;
  regulation?: string | null;
}
