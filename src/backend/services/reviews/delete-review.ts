import { Review } from '../../../backend/entities/reviews.entity';
import { getDatabaseConnection } from '../../config/data-source-config';

export const deleteReviewRecord = async (id: number) => {
  const connection = await getDatabaseConnection();

  await connection.manager.delete(Review, { id });
};
