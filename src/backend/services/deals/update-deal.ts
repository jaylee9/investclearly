import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { createAttachment } from '../attachments/create-attachment';
import { uploadFile } from '../files/upload-file';
import { getDealById } from './get-deal-by-id';
import { getAttachments } from '../attachments/get-attachments';
import { deleteFile } from '../files/delete-file';
import { deleteAttachment } from '../attachments/delete-attachments';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { UpdateDealInterface } from './interfaces/update-deal.interface';
import { createOrUpdateLocation } from '../locations/create-or-update-location';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export const update = async (
  id: number,
  fields: UpdateDealInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const {
    attachmentsIdsToDelete,
    investmentStructures,
    regions,
    street1,
    street2,
    city,
    stateOrCountry,
    stateOrCountryDescription,
    zipCode,
    ...updateDealData
  } = fields;

  const transformedAttachmentsIdsToDelete = transformObjectKeysToArrays({
    attachmentsIdsToDelete,
  });

  const transformedData = transformObjectKeysToArrays({
    investmentStructures,
    regions,
  });

  await getDealById(id);

  await connection.manager.update(
    Deal,
    { id },
    {
      ...updateDealData,
      ...transformedData,
    }
  );

  if (files?.length) {
    for (const file of files) {
      const fileData = await uploadFile(file, TargetTypesConstants.deals);
      await createAttachment(fileData, id, TargetTypesConstants.deals);
    }
  }

  if (transformedData.attachmentsIdsToDelete?.length !== 0) {
    const attachments = await getAttachments(
      id,
      TargetTypesConstants.deals,
      transformedAttachmentsIdsToDelete.attachmentsIdsToDelete
    );
    for (const attachment of attachments) {
      await deleteFile(attachment.path);
      await deleteAttachment(attachment.id);
    }
  }

  await createOrUpdateLocation(
    {
      street1,
      street2,
      city,
      stateOrCountry,
      stateOrCountryDescription,
      zipCode,
    },
    LocationTargetTypesConstants.deal,
    id
  );

  return getDealById(id);
};
