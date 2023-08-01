import { TargetTypesConstants } from '../../constants/target-types-constants';
import { createAttachment } from '../attachments/create-attachment';
import { uploadFile } from '../files/upload-file';
import { getAttachments } from '../attachments/get-attachments';
import { deleteFile } from '../files/delete-file';
import { deleteAttachment } from '../attachments/delete-attachments';
import { transformObjectKeysToArrays } from '../../utils/transform-object-keys-to-arrays';
import { UpdateReviewInterface } from './interfaces/update-review.interface';
import { getReviewById } from './get-review-by-id';

export const update = async (
  id: number,
  fields: UpdateReviewInterface,
  files: Express.Multer.File[]
) => {
  const { attachmentsIdsToDelete } = fields;

  const transformedData = transformObjectKeysToArrays({
    attachmentsIdsToDelete,
  });

  await getReviewById(id);

  if (files.length) {
    for (const file of files) {
      const fileUrl = await uploadFile(file, TargetTypesConstants.reviewProofs);
      await createAttachment(fileUrl, id, TargetTypesConstants.reviewProofs);
    }
  }

  if (transformedData.attachmentsIdsToDelete.length !== 0) {
    const attachments = await getAttachments(
      id,
      TargetTypesConstants.reviewProofs,
      transformedData.attachmentsIdsToDelete
    );
    for (const attachment of attachments) {
      await deleteFile(attachment.path);
      await deleteAttachment(attachment.id);
    }
  }
  return getReviewById(id);
};
