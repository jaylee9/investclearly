import { CreateLocationInterface } from '../../locations/interfaces/create-location.interface';

export interface CreateOrUpdateRelatedPersonInterface {
  firstName: string;
  middleName: string;
  lastName: string;
  relationshipClarification: string;
  location: CreateLocationInterface;
}
