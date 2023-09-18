import { createRelatedPerson } from '../relatedPersons/create-related-person';
import { createOrUpdateRelatedPerson } from '../relatedPersons/create-or-update-related-person';
import { FormD } from './interfaces/form-D.interface';
import { Deal } from '../../entities/deals.entity';

export const prepareRelatedPersonData = async (offering: FormD, deal: Deal) => {
  const relatedPersonRecords = [];

  for (const relatedPerson of offering?.relatedPersonsList?.relatedPersonInfo ||
    []) {
    const relatedPersonData = {
      firstName: relatedPerson?.relatedPersonName?.firstName || '',
      middleName: relatedPerson?.relatedPersonName?.middleName || '',
      lastName: relatedPerson?.relatedPersonName?.lastName || '',
      relationships:
        relatedPerson?.relatedPersonRelationshipList?.relationship || [],
      relationshipClarification: relatedPerson?.relationshipClarification || '',
      location: relatedPerson?.relatedPersonAddress || '',
    };
    const relatedPersonRecord = await (deal
      ? createOrUpdateRelatedPerson
      : createRelatedPerson)(relatedPersonData);

    if (relatedPersonRecord) {
      relatedPersonRecords.push(relatedPersonRecord);
    }
  }

  return relatedPersonRecords;
};
