import { RelatedPerson } from '../../entities/relatedPersons.entity';
import { Location } from '../../entities/locations.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { createOrUpdateLocation } from '../locations/create-or-update-location';
import { createRelatedPerson } from './create-related-person';
import { CreateOrUpdateRelatedPersonInterface } from './interfaces/create-or-update-related-person.interface';

export const createOrUpdateRelatedPerson = async (
  relatedPersonData: CreateOrUpdateRelatedPersonInterface
) => {
  const { location, ...relatedPerson } = relatedPersonData;
  const connection = await getDatabaseConnection();

  const relatedPersonRecord = await connection.manager
    .createQueryBuilder()
    .select('relatedPerson')
    .from(RelatedPerson, 'relatedPerson')
    .where('relatedPerson.firstName = :firstName', {
      firstName: relatedPerson.firstName,
    })
    .andWhere('relatedPerson.lastName = :lastName', {
      lastName: relatedPerson.lastName,
    })
    .leftJoinAndMapMany(
      'relatedPerson.locations',
      Location,
      'locations',
      'locations.entityId = relatedPerson.id AND locations.entityType = :relatedPersonEntityType',
      { relatedPersonEntityType: LocationTargetTypesConstants.relatedPerson }
    )
    .getOne();

  if (relatedPersonRecord) {
    await connection.manager.update(
      RelatedPerson,
      { id: relatedPersonRecord.id },
      relatedPerson
    );

    if (relatedPersonRecord?.locations[0] || location) {
      await createOrUpdateLocation(
        location,
        LocationTargetTypesConstants.relatedPerson,
        relatedPersonRecord.id
      );
    }
  } else {
    await createRelatedPerson(relatedPersonData);
  }

  return relatedPersonRecord;
};
