export interface UpdateDealInterface {
  id: number;
  dealTitle?: string;
  dealAddress?: string;
  region: string;
  status: string;
  assetClass: string;
  description?: string;
  minimumInvestment?: number;
  cashOnCash?: number;
  investmentStructure: string;
  fees?: number;
  targetRaise?: number;
  equityMultiple?: number;
  holdPeriod: string;
  targetIRR?: number;
  actualIRR?: number;
  dealLegalName?: string;
  dealSponsor?: string;
  exemption?: string;
  attachmentsIdsToDelete?: number[] | number;
  createdAt: Date;
  updatedAt: Date;
}
