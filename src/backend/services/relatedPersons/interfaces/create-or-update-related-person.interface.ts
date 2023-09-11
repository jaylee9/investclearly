import { LocationInterface } from '../../locations/interfaces/location.interface';

export interface CreateOrUpdateRelatedPersonInterface {
  firstName: string;
  middleName: string;
  lastName: string;
  relationships: string[];
  relationshipClarification: string;
  location: LocationInterface;
}
