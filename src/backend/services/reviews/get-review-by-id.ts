import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Attachment } from '../../entities/attachments.entity';
import { Review } from '../../../backend/entities/reviews.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { ReviewConstants } from '../../../backend/constants/review-constants';
import { reviewMapper } from '../../../backend/mappers/review.mapper';

export const getReviewById = async (id: number) => {
  const connection = await getDatabaseConnection();
  const review = await connection.manager
    .createQueryBuilder()
    .select('reviews')
    .from(Review, 'reviews')
    .leftJoinAndSelect('reviews.sponsor', 'sponsor')
    .leftJoinAndSelect('reviews.deal', 'deal')
    .leftJoinAndSelect('reviews.reviewer', 'reviewer')
    .leftJoinAndMapMany(
      'reviews.attachments',
      Attachment,
      'attachments',
      'attachments.entityId = reviews.id AND attachments.entityType = :entityType',
      { entityType: TargetTypesConstants.reviewProofs }
    )
    .where('reviews.id = :id', { id })
    .getOne();

  if (!review) {
    throw new createHttpError.NotFound(ReviewConstants.reviewNotFound);
  }

  return reviewMapper(review);
};
