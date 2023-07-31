import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { createAttachment } from '../attachments/create-attachment';
import { uploadFile } from '../files/upload-file';
import { getDealById } from './get-deal-by-id';
import { UpdateDealInterface } from './interfaces/update-deal.interface';
import { getAttachments } from '../attachments/get-attachments';
import { deleteFile } from '../files/delete-file';
import { deleteAttachment } from '../attachments/delete-attachments';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';

export const update = async (
  id: number,
  fields: UpdateDealInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();
  const { attachmentsIdsToDelete, ...updateDealData } = fields;

  const transformedData = transformObjectKeysToArrays({
    attachmentsIdsToDelete,
  });

  await getDealById(id);
  await connection.manager.update(Deal, { id }, updateDealData);

  if (files.length) {
    for (const file of files) {
      const fileUrl = await uploadFile(file, TargetTypesConstants.deals);
      await createAttachment(fileUrl, id, TargetTypesConstants.deals);
    }
  }

  if (transformedData.attachmentsIdsToDelete.length !== 0) {
    const attachments = await getAttachments(
      id,
      TargetTypesConstants.deals,
      transformedData.attachmentsIdsToDelete
    );
    for (const attachment of attachments) {
      await deleteFile(attachment.path);
      await deleteAttachment(attachment.id);
    }
  }
  return getDealById(id);
};
