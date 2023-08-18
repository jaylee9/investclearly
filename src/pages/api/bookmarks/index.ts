import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { CreateBookmarkInterface } from '../../../backend/services/bookmarks/interfaces/create-bookmark.interface';
import { createBookmark } from '../../../backend/services/bookmarks/create-bookmark';
import { BookmarkConstants } from '../../../backend/constants/bookmark-constants';
import { GetAllEntriesFromBookmarksInterface } from '../../../backend/services/bookmarks/interfaces/find-all-bookmarks-entries.interface';
import { getAllEntriesFromBookmarks } from '../../../backend/services/bookmarks/get-entries-from-bookmarks';
import { deleteBookmarkRecord } from '../../../backend/services/bookmarks/delete-bookmark';
import { DeleteBookmarkInterface } from '../../../backend/services/bookmarks/interfaces/delete-bookmark.interface';

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const body: CreateBookmarkInterface = authRequest.body;
  const userId = user?.id;
  const bookmark = await createBookmark(body, userId!);

  if (bookmark) {
    response
      .status(200)
      .json({ message: BookmarkConstants.bookmarkSuccessfullyAdded });
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getEntriesFromBookmarks = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const params: GetAllEntriesFromBookmarksInterface = authRequest.query;

  if (user) {
    const bookmarks = await getAllEntriesFromBookmarks(params, user.id);
    response.status(200).json(bookmarks);
  }
};

const deleteBookmark = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );

  const { entityId, entityType } =
    authRequest.query as unknown as DeleteBookmarkInterface;
  const userId = user?.id;
  await deleteBookmarkRecord(entityId, entityType, userId!);
  response
    .status(200)
    .json({ message: BookmarkConstants.bookmarkSuccessfullyDeleted });
};

export default apiHandler({
  POST: create,
  GET: getEntriesFromBookmarks,
  DELETE: deleteBookmark,
});
