import { DeepPartial } from 'typeorm';
import { TargetTypesConstants } from '../../constants/target-types-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { uploadFile } from '../files/upload-file';
import { createAttachment } from '../attachments/create-attachment';
import { Review } from '../../../backend/entities/reviews.entity';
import { ReviewInterface } from './interfaces/review.interface';
import { getReviewById } from './get-review-by-id';

export const createReview = async (
  userId: number,
  data: DeepPartial<Review>,
  files: Express.Multer.File[]
) => {
  const connection = await getDatabaseConnection();

  const review = connection.manager.create(Review, {
    ...data,
    reviewerId: userId,
  }) as unknown as ReviewInterface;
  await connection.manager.save(review);
  const reviewRecord = await getReviewById(review.id);

  if (files?.length) {
    for (const file of files) {
      const fileData = await uploadFile(
        file,
        TargetTypesConstants.reviewProofs
      );
      await createAttachment(
        fileData,
        reviewRecord.id,
        TargetTypesConstants.reviewProofs
      );
    }

    await connection.manager.update(
      Review,
      { id: review.id },
      { isVerified: false }
    );
  }

  return getReviewById(review.id);
};
