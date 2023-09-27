import { LocationInterface } from '../../locations/interfaces/location.interface';

export interface RelatedPersonInterface {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  relationships: string[];
  relationshipClarification: string;
  createdAt: Date;
  updatedAt: Date;
  locations: LocationInterface[];
}
