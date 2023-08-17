import createHttpError from 'http-errors';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';

export const deleteBookmarkRecord = async (
  entityId: number,
  entityType: string,
  userId: number
) => {
  const connection = await getDatabaseConnection();
  const bookmark = await connection.manager.findOne(Bookmark, {
    where: { entityId, entityType, userId },
  });

  if (!bookmark) {
    throw new createHttpError.NotFound(BookmarkConstants.bookmarkNotFound);
  }
  await connection.manager.delete(Bookmark, { entityId, entityType, userId });
};
