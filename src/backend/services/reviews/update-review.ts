import { TargetTypesConstants } from '../../constants/target-types-constants';
import { createAttachment } from '../attachments/create-attachment';
import { uploadFile } from '../files/upload-file';
import { getAttachments } from '../attachments/get-attachments';
import { deleteFile } from '../files/delete-file';
import { deleteAttachment } from '../attachments/delete-attachments';
import { transformObjectKeysToArrays } from '../../utils/transform-object-keys-to-arrays';
import { UploadReviewProofsInterface } from './interfaces/upload-review-proofs.interface';
import { getReviewById } from './get-review-by-id';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { Review } from '../../../backend/entities/reviews.entity';

export const update = async (
  id: number,
  fields: UploadReviewProofsInterface,
  files: Express.Multer.File[]
) => {
  const { attachmentsIdsToDelete } = fields;

  const transformedData = transformObjectKeysToArrays({
    attachmentsIdsToDelete,
  });

  await getReviewById(id);

  if (files?.length) {
    for (const file of files) {
      const fileData = await uploadFile(
        file,
        TargetTypesConstants.reviewProofs
      );
      await createAttachment(fileData, id, TargetTypesConstants.reviewProofs);
    }

    const connection = await getDatabaseConnection();
    await connection.manager.update(Review, { id }, { isVerified: true });
  }

  if (transformedData.attachmentsIdsToDelete?.length !== 0) {
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
