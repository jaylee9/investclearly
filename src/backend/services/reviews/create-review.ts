import { TargetTypesConstants } from '../../constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { createAttachment } from '../attachments/create-attachment';
import { Review } from '../../../backend/entities/reviews.entity';
import { ReviewInterface } from './interfaces/review.interface';
import { CreateReviewInterface } from './interfaces/create-review.interface';
import { getReviewById } from './get-review-by-id';

export const createReview = async (
  data: CreateReviewInterface,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();

  const review = connection.manager.create(Review, data) as ReviewInterface;
  await connection.manager.save(review);
  const reviewRecord = await getReviewById(review.id);

  if (files.length) {
    for (const file of files) {
      const fileUrl = await uploadFile(file, TargetTypesConstants.reviewProofs);
      await createAttachment(
        fileUrl,
        reviewRecord.id,
        TargetTypesConstants.deals
      );
    }
  }

  return reviewRecord;
};
