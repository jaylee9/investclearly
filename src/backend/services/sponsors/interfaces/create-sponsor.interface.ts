export interface CreateSponsorInterface {
  vanityName?: string | null;
  legalName?: string | null;
  userId?: number | null;
  businessAvatar?: string | null;
  businessEmail?: string | null;
  businessPhone?: string | null;
  sponsorName?: string | null;
  address?: string | null;
  website?: string | null;
  description?: string | null;
  aum?: number | null;
  specialty?: string | null;
  investmentStructure?: string | null;
  facebookLink?: string | null;
  linkedInLink?: string | null;
  twitterLink?: string | null;
  instagramLink?: string | null;
  exemption?: string | null;
  workForThisCompany?: boolean | null;
  region?: string | null;
  cashOnCash?: number | null;
  equityMultiple?: number | null;
  holdPeriod?: string | null;
  targetIRR?: number | null;
  actualIRR?: number | null;
  fees?: number | null;
}
