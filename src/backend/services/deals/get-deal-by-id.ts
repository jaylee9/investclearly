import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { DealConstants } from '../../constants/deal-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { Attachment } from '../../../backend/entities/attachments.entity';

export const getDealById = async (id: number) => {
  const connection = await getDatabaseConnection();
  const deal = await connection.manager
    .createQueryBuilder()
    .select('deals')
    .from(Deal, 'deals')
    .leftJoinAndSelect('deals.sponsor', 'sponsor')
    .leftJoinAndMapMany(
      'deals.attachments',
      Attachment,
      'attachments',
      'attachments.entityId = deals.id AND attachments.entityType = :entityType',
      { entityType: 'deals' }
    )
    .where('deals.id = :id', { id })
    .getOne();

  if (!deal) {
    throw new createHttpError.NotFound(DealConstants.dealNotFound);
  }

  return dealMapper(deal);
};
