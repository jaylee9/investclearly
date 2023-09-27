export interface CreateSponsorInterface {
  vanityName: string;
  legalName: string;
  userId: number;
  businessAvatar: string;
  businessEmail: string;
  businessPhone: string;
  sponsorName: string;
  address: string;
  website: string;
  description: string;
  aum: number;
  specialties: string | string[];
  investmentStructures: string | string[];
  facebookLink: string;
  linkedInLink: string;
  twitterLink: string;
  instagramLink: string;
  exemptions: string | string[];
  workForThisCompany: boolean;
  regions: string | string[];
  cashOnCash: number;
  equityMultiple: number;
  holdPeriod: number;
  targetIRR: number;
  actualIRR: number;
  fees: number;
  regulations: string | string[];
  interests: string | string[];
  street1: string;
  street2: string;
  city: string;
  stateOrCountry: string;
  stateOrCountryDescription: string;
  zipCode: string;
  yearOfFoundation: number;
}
