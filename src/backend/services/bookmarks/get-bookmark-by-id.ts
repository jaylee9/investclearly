import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Bookmark } from '../../entities/bookmark.entity';
import { BookmarkConstants } from '../../constants/bookmark-constants';

export const getBookmarkById = async (id: number) => {
  const connection = await getDatabaseConnection();
  const bookmark = await connection.manager.findOne(Bookmark, {
    where: { id },
  });

  if (!bookmark) {
    throw new createHttpError.NotFound(BookmarkConstants.bookmarkNotFound);
  }

  return bookmark;
};
