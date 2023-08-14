import { Brackets } from 'typeorm';
import { getDatabaseConnection } from '../../config/data-source-config';
import { OrderDirectionConstants } from '../../constants/order-direction-constants';
import { pagination } from '../../utils/pagination/pagination';
import { buildPaginationInfo } from '../../utils/pagination/build-pagination-info';
import { PaginationConstants } from '../../constants/pagination-constants';
import { Attachment } from '../../entities/attachments.entity';
import { FindAllReviewsInterface } from './interfaces/get-all-reviews.interface';
import { Review } from '../../../backend/entities/reviews.entity';
import { TargetTypesConstants } from '../../../backend/constants/target-types-constants';
import { reviewMapper } from '../../../backend/mappers/review.mapper';

export const getAllReviews = async (params: FindAllReviewsInterface) => {
  const {
    pageSize = PaginationConstants.defaultPageSize,
    page = PaginationConstants.defaultPage,
    orderDirection = OrderDirectionConstants.DESC,
    status,
    userId,
    search,
  } = params;

  const connection = await getDatabaseConnection();
  let searchQuery = connection.manager
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
    );

  if (status) {
    searchQuery = searchQuery.andWhere('reviews.status = :status', {
      status,
    });
  }

  if (userId) {
    searchQuery = searchQuery.andWhere('reviews.reviewerId = :userId', {
      userId,
    });
  }

  if (search) {
    const fieldsToSearch = [
      'deal.dealTitle',
      'deal.dealAddress',
      'deal.dealLegalName',
      'deal.dealSponsor',
      'deal.description',
      'sponsor.vanityName',
      'sponsor.legalName',
      'sponsor.address',
      'sponsor.sponsorName',
      'reviewer.firstName',
      'reviewer.lastName',
    ];

    searchQuery = searchQuery.andWhere(
      new Brackets(qb => {
        fieldsToSearch.forEach(field => {
          qb.orWhere(`${field} ILIKE :search`, { search: `%${search}%` });
        });
      })
    );
  }

  searchQuery = searchQuery.orderBy('reviews.createdAt', orderDirection);
  searchQuery = pagination(pageSize, page, searchQuery);

  const [reviews, count] = await searchQuery.getManyAndCount();
  const paginationData = await buildPaginationInfo(count, page, pageSize);

  return {
    reviews: await Promise.all(reviews.map(reviewMapper)),
    ...paginationData,
  };
};
