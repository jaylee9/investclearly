import { DeepPartial } from 'typeorm';
import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { CreateBookmarkInterface } from './interfaces/create-bookmark.interface';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { getDealById } from '../deals/get-deal-by-id';
import { getSponsorById } from '../sponsors/get-sponsor-by-id';
import { getBookmarkById } from './get-bookmark-by-id';

export const createBookmark = async (
  data: DeepPartial<CreateBookmarkInterface>,
  userId: number,
  showOnlyPublishedDeals: boolean
) => {
  const connection = await getDatabaseConnection();
  const { entityId, entityType } = data;

  const bookmarkRecord = await connection.manager.findOne(Bookmark, {
    where: {
      entityId,
      entityType,
      userId,
    },
  });

  if (bookmarkRecord) {
    throw new createHttpError.NotFound(
      BookmarkConstants.bookmarkAlreadyCreated
    );
  }

  if (entityType === BookmarkConstants.entityTypes.deal) {
    await getDealById(entityId!, showOnlyPublishedDeals);
  }

  if (entityType === BookmarkConstants.entityTypes.sponsor) {
    await getSponsorById(entityId!);
  }

  const bookmark = connection.manager.create(Bookmark, {
    entityType,
    entityId,
    userId,
  });
  await connection.manager.save(bookmark);

  return getBookmarkById(bookmark.id);
};
