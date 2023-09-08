export interface LocationInterface {
  id: number;
  entityId: number;
  entityType: string;
  street1: string;
  street2: string;
  city: string;
  stateOrCountry: string;
  stateOrCountryDescription: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}
