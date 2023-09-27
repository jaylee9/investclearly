import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { GetAllEntriesFromBookmarksInterface } from './interfaces/find-all-bookmarks-entries.interface';
import { Bookmark } from '../../../backend/entities/bookmark.entity';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { getAllDeals } from '../deals/get-all-deals';
import { getAllSponsors } from '../sponsors/get-all-sponsors';
import { buildEmptyPaginationInfo } from '../../../backend/utils/pagination/build-empty-pagination-info';
import { DealConstants } from '@/backend/constants/deal-constants';
import { SponsorConstants } from '@/backend/constants/sponsor-constants';

export const getAllEntriesFromBookmarks = async (
  params: GetAllEntriesFromBookmarksInterface,
  userId: number
) => {
  const entityType = params.entityType;
  const connection = await getDatabaseConnection();
  const responseEntity =
    entityType === BookmarkConstants.entityTypes.deal
      ? DealConstants.deals
      : SponsorConstants.sponsors;

  const bookmarks = await connection.manager.find(Bookmark, {
    where: { entityType, userId },
  });

  params.entityIds = bookmarks.map(record => record.entityId);
  params.currentUserId = userId;
  let entities = null;

  if (params.entityIds?.length) {
    if (params.entityType === BookmarkConstants.entityTypes.deal) {
      entities = await getAllDeals(params);
    }

    if (params.entityType === BookmarkConstants.entityTypes.sponsor) {
      entities = await getAllSponsors(params);
    }
  } else {
    return buildEmptyPaginationInfo(responseEntity);
  }

  return entities;
};
