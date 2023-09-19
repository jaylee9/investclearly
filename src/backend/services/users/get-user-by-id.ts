import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { userMapper } from '../../mappers/user.mapper';
import { UserConstants } from '../../constants/users-constants';
import { Review } from '../../../backend/entities/reviews.entity';
import { ReviewStatuses } from '../../../backend/constants/enums/review-statuses';
import { Investment } from '../../../backend/entities/investments.entity';
import { Location } from '../../entities/locations.entity';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export const getUserById = async (
  id: number,
  reviewsLimit = UserConstants.defaultLimits.defaultReviewsLimit,
  investmentsLimit = UserConstants.defaultLimits.defaultInvestmentsLimit
) => {
  const connection = await getDatabaseConnection();

  const user = await connection.manager
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.id = :id', { id })
    .leftJoinAndMapMany(
      'user.locations',
      Location,
      'locations',
      'locations.entityId = user.id AND locations.entityType = :userEntityType',
      { userEntityType: LocationTargetTypesConstants.user }
    )
    .getOne();

  if (!user) {
    throw new createHttpError.NotFound(UserConstants.userNotFound);
  }

  const reviewsQuery = connection.manager
    .createQueryBuilder(Review, 'reviews')
    .where('reviews.sponsorId = :sponsorId', { sponsorId: id })
    .andWhere('reviews.status = :reviewStatus', {
      reviewStatus: ReviewStatuses.published,
    })
    .leftJoinAndSelect('reviews.sponsor', 'sponsor');

  user.reviewsCount = await reviewsQuery.clone().getCount();
  user.reviews = await reviewsQuery.limit(reviewsLimit).getMany();

  if (user.yourDealsVisibility) {
    const investmentsQuery = connection.manager
      .createQueryBuilder()
      .select('investment')
      .from(Investment, 'investment')
      .where('investment.userId = :userId', { userId: id })
      .leftJoinAndSelect('investment.deal', 'deal')
      .leftJoinAndSelect('investment.user', 'user');

    user.investmentsCount = await investmentsQuery.clone().getCount();
    user.investments = await investmentsQuery.limit(investmentsLimit).getMany();
  }

  return userMapper(user);
};
