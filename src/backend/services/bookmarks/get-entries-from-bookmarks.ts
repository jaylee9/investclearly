import createHttpError from 'http-errors';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { GetAllEntriesFromBookmarksInterface } from './interfaces/find-all-bookmarks-entries.interface';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { getAllDeals } from '../deals/get-all-deals';
import { getAllSponsors } from '../sponsors/get-all-sponsors';

export const getAllEntriesFromBookmarks = async (
  params: GetAllEntriesFromBookmarksInterface,
  userId: number
) => {
  const connection = await getDatabaseConnection();
  params.entityIds = await (
    await connection.manager.find(Bookmark, {
      where: { entityType: params.entityType, userId },
    })
  ).map(record => record.entityId);

  let entities = null;

  if (params.entityIds?.length) {
    if (params.entityType === BookmarkConstants.entityTypes.deal) {
      entities = await getAllDeals(params);
    }

    if (params.entityType === BookmarkConstants.entityTypes.sponsor) {
      entities = await getAllSponsors(params);
    }
  } else {
    throw new createHttpError.NotFound(
      BookmarkConstants.bookmarkEntriesNotFound
    );
  }

  return entities;
};
