import { createOrUpdateRelatedPerson } from '../relatedPersons/create-or-update-related-person';
import { FormD } from './interfaces/form-D.interface';

export const prepareRelatedPersonData = async (offering: FormD) => {
  const relatedPersonRecords = [];

  for (const relatedPerson of offering?.relatedPersonsList?.relatedPersonInfo ||
    []) {
    const relatedPersonData = {
      firstName: relatedPerson?.relatedPersonName?.firstName || '',
      middleName: relatedPerson?.relatedPersonName?.middleName || '',
      lastName: relatedPerson?.relatedPersonName?.lastName || '',
      relationshipClarification: relatedPerson?.relationshipClarification || '',
      location: relatedPerson?.relatedPersonAddress || '',
    };
    const relatedPersonRecord = await createOrUpdateRelatedPerson(
      relatedPersonData
    );

    if (relatedPersonRecord) {
      relatedPersonRecords.push({
        ...relatedPersonRecord,
        relatedPersonRoles:
          relatedPerson?.relatedPersonRelationshipList?.relationship || [],
      });
    }
  }

  return relatedPersonRecords;
};
