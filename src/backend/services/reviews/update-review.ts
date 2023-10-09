import createHttpError from 'http-errors';
import { TargetTypesConstants } from '../../constants/target-types-constants';
import { createAttachment } from '../attachments/create-attachment';
import { uploadFile } from '../files/upload-file';
import { getAttachments } from '../attachments/get-attachments';
import { deleteFile } from '../files/delete-file';
import { deleteAttachment } from '../attachments/delete-attachments';
import { transformObjectKeysToArrays } from '../../utils/transform-object-keys-to-arrays';
import { getReviewById } from './get-review-by-id';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { Review } from '../../../backend/entities/reviews.entity';
import { UpdateReviewInterface } from './interfaces/update-review.interface';
import { ReviewConstants } from '../../../backend/constants/review-constants';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';

export const update = async (
  id: number,
  fields: UpdateReviewInterface,
  files: Express.Multer.File[],
  userId: number
) => {
  const { attachmentsIdsToDelete, ...reviewData } = fields;
  const transformedData = transformObjectKeysToArrays({
    attachmentsIdsToDelete,
  });

  const review = await getReviewById(id);

  if (
    +review.reviewerId === +userId &&
    review.status === ReviewStatuses.published
  ) {
    throw new createHttpError.NotFound(ReviewConstants.reviewNotFound);
  }

  if (files?.length) {
    for (const file of files) {
      const fileData = await uploadFile(
        file,
        TargetTypesConstants.reviewProofs
      );
      await createAttachment(fileData, id, TargetTypesConstants.reviewProofs);
    }
  }

  const connection = await getDatabaseConnection();
  await connection.manager.update(
    Review,
    { id },
    { ...reviewData, status: ReviewStatuses.onModeration, isVerified: false }
  );

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
