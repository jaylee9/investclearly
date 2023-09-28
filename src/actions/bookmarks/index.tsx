import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import notAuthorizedErrorHandler, {
  Roles,
} from '@/helpers/notAuthorizedErrorHandler';
import { HTTPError } from 'ky';
import { NextRouter } from 'next/router';
import queryString from 'query-string';
import { toast } from 'react-toastify';

interface GetBookmarksInterface {
  search?: string;
  page?: number;
  pageSize?: number;
  router: NextRouter;
}

export interface GetDealsBookmarksResponse extends TPaginationInfo {
  deals: DealInterface[];
}

export const getDealsBookmarks = async ({
  page,
  pageSize,
  search,
  router,
}: GetBookmarksInterface): Promise<
  GetDealsBookmarksResponse | { error: string }
> => {
  try {
    const stringifiedParameters = queryString.stringify(
      { page, pageSize, search, entityType: 'Deal' },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: GetDealsBookmarksResponse = await api
      .get(`bookmarks?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.USER,
      });
    }
    const errorMessage = 'Failed to fetch saved deals';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export interface GetSponsorsBookmarksResponse extends TPaginationInfo {
  sponsors: SponsorInterface[];
}

export const getSponsorsBookmarks = async ({
  page,
  pageSize,
  search,
  router,
}: GetBookmarksInterface): Promise<
  GetSponsorsBookmarksResponse | { error: string }
> => {
  try {
    const stringifiedParameters = queryString.stringify(
      { page, pageSize, search, entityType: 'Sponsor' },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: GetSponsorsBookmarksResponse = await api
      .get(`bookmarks?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.USER,
      });
    }
    const errorMessage = 'Failed to fetch saved sponsors';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const deleteDealBookmark = async ({
  entityId,
  router,
}: {
  entityId: number;
  router: NextRouter;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const stringifiedParameters = queryString.stringify({
      entityType: 'Deal',
      entityId,
    });
    const response: { message: string } = await api
      .delete(`bookmarks?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.USER,
      });
    }
    const errorMessage = 'Failed to remove deal from saved';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const deleteSponsorBookmark = async ({
  entityId,
  router,
}: {
  entityId: number;
  router: NextRouter;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const stringifiedParameters = queryString.stringify({
      entityType: 'Sponsor',
      entityId,
    });
    const response: { message: string } = await api
      .delete(`bookmarks?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.USER,
      });
    }
    const errorMessage = 'Failed to remove sponsor from saved';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
