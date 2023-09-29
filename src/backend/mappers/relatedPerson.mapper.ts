import { RelatedPerson } from '../entities/relatedPersons.entity';
import { RelatedPersonInterface } from '../services/relatedPersons/interfaces/related-person.interface';
import { locationMapper } from './locations.mapper';

export const relatedPersonMapper = (
  relatedPerson: RelatedPerson
): RelatedPersonInterface => {
  return {
    id: relatedPerson.id,
    firstName: relatedPerson.firstName,
    middleName: relatedPerson.middleName,
    lastName: relatedPerson.lastName,
    relationshipClarification: relatedPerson.relationshipClarification,
    locations: relatedPerson.locations
      ? relatedPerson.locations.map(locationMapper)
      : [],
    createdAt: relatedPerson.createdAt,
    updatedAt: relatedPerson.updatedAt,
  };
};
