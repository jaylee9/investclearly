import { RelatedPerson } from '../../entities/relatedPersons.entity';
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
    .select('related_person')
    .from(RelatedPerson, 'related_person')
    .where('related_person.first_name', { first_name: relatedPerson.firstName })
    .andWhere('related_person.last_name', { last_name: relatedPerson.lastName })
    .leftJoinAndMapMany(
      'related_person.locations',
      Location,
      'locations',
      'locations.entityId = related_person.id AND locations.entityType = :relatedPeersonEntityType',
      { relatedPeersonEntityType: LocationTargetTypesConstants.relatedPerson }
    )
    .getOne();

  if (relatedPersonRecord) {
    await connection.manager.update(
      RelatedPerson,
      { id: relatedPersonRecord.id },
      relatedPerson
    );

    if (relatedPersonRecord?.locations[0] && relatedPersonRecord) {
      await createOrUpdateLocation(
        location,
        LocationTargetTypesConstants.relatedPerson,
        relatedPersonRecord.id
      );
    }
  } else {
    await createRelatedPerson(relatedPersonData);
  }
};
