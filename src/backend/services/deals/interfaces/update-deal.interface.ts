export interface UpdateDealInterface {
  id: number;
  dealTitle?: string;
  dealAddress?: string;
  regions: string;
  status: string;
  assetClass: string;
  description?: string;
  minimumInvestment?: number;
  cashOnCash?: number;
  investmentStructures: string;
  fees?: number;
  targetRaise?: number;
  equityMultiple?: number;
  holdPeriod: number;
  targetIRR?: number;
  actualIRR?: number;
  dealLegalName?: string;
  dealSponsor?: string;
  exemption?: string;
  attachmentsIdsToDelete?: number[] | number;
  secIndustry?: string;
  closeDate?: Date;
  regulation?: string;
  createdAt: Date;
  updatedAt: Date;
}
