import { RelatedPerson } from '../../entities/relatedPersons.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { RelatedPersonInterface } from './interfaces/related-person.interface';
import { createLocation } from '../locations/create-location';
import { CreateOrUpdateRelatedPersonInterface } from './interfaces/create-or-update-related-person.interface';

export const createRelatedPerson = async (
  relatedPersonData: CreateOrUpdateRelatedPersonInterface
) => {
  const { location, ...relatedPerson } = relatedPersonData;
  const connection = await getDatabaseConnection();

  if (relatedPerson) {
    const relatedPersonRecord = (await connection.manager.create(
      RelatedPerson,
      relatedPerson
    )) as RelatedPersonInterface;

    await connection.manager.save(relatedPersonRecord);

    if (location && relatedPerson) {
      await createLocation(
        location,
        LocationTargetTypesConstants.relatedPerson,
        relatedPersonRecord.id
      );
    }

    return relatedPersonRecord;
  }
};
