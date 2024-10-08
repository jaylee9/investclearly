import { ClaimTypes } from '@/backend/constants/enums/claim-types';
import { CreateSponsorInterface } from '@/backend/services/sponsors/interfaces/create-sponsor.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import customToast, { ToastType } from '@/components/common/Toast/customToast';
import { ISponsorFilters } from '@/components/page/List/Sponsors/SponsorsFilters';
import api from '@/config/ky';
import { ClaimPayload } from '@/types/common';
import { serialize } from 'object-to-formdata';
import queryString from 'query-string';
import { omitBy } from 'lodash';

interface ISponsorActionFilters extends ISponsorFilters {
  page: number;
  pageSize: number;
  orderDirection?: 'DESC' | 'ASC';
  search?: string;
}

export interface GetAllSponsorsResponse {
  sponsors: SponsorInterface[];
  total: number;
  currentPage: number;
  lastPage: number;
}

export const getAllSponsors = async (
  filters: ISponsorActionFilters
): Promise<GetAllSponsorsResponse | { error: string }> => {
  const ratings = filters.ratings || [];
  let minRating: number | undefined;
  let maxRating: number | undefined;

  if (ratings.length > 0) {
    minRating = Math.min(...ratings);
    maxRating = Math.max(...ratings);
  }
  const parameters = {
    page: filters.page,
    pageSize: filters.pageSize,
    orderDirection: filters.orderDirection || 'DESC',
    primaryAssetClasses: filters.primaryAssetClasses,
    stateOrCountryDescriptions: filters.stateOrCountryDescriptions,
    activelyRising: filters.activelyRising,
    search: filters.search,
    minRating,
    maxRating,
  };

  const stringifiedParameters = queryString.stringify(parameters, {
    arrayFormat: 'none',
    skipNull: true,
    skipEmptyString: true,
  });

  const url = `sponsors?${stringifiedParameters}`;

  try {
    const response: GetAllSponsorsResponse = await api.get(url).json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to fetch sponsors';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

interface GetSponsorPayload {
  id: string;
  reviewsLimit: number;
  dealsLimit: number;
  token?: string;
}

export const getSponsor = async ({
  id,
  reviewsLimit,
  dealsLimit,
  token,
}: GetSponsorPayload): Promise<SponsorInterface | { error: string }> => {
  try {
    const headers = token
      ? {
          Cookie: `accessToken=${token}`,
        }
      : {};
    const stringifiedParameters = queryString.stringify(
      { reviewsLimit, dealsLimit },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: SponsorInterface = await api
      .get(`sponsors/${id}?${stringifiedParameters}`, { headers })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to fetch sponsor';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const addSponsorToBookmark = async ({
  entityId,
}: {
  entityId: number;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('bookmarks', { json: { entityType: 'Sponsor', entityId } })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to save sponsor';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const deleteSponsorFromBookmarks = async ({
  entityId,
}: {
  entityId: number;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const stringifiedParameters = queryString.stringify({
      entityId,
      entityType: 'Sponsor',
    });
    const response: { message: string } = await api
      .delete('bookmarks', { searchParams: stringifiedParameters })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to delete sponsor from saved';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

type ModifiedCreateSponsorInterface = Omit<
  CreateSponsorInterface,
  'businessAvatar'
> & {
  businessAvatar: Blob | string;
};

export type PartialCreateSponsorInterface =
  Partial<ModifiedCreateSponsorInterface>;

export const createSponsor = async ({
  payload,
}: {
  payload: PartialCreateSponsorInterface;
}): Promise<SponsorInterface | { error: string }> => {
  const formData = serialize(payload, {
    indices: true,
    nullsAsUndefineds: true,
  });

  try {
    const response: SponsorInterface = await api
      .post('admin/sponsors', {
        body: formData,
      })
      .json();
    return response;
  } catch (error) {
    return { error: 'Failed to create sponsor' };
  }
};

export const editSponsor = async ({
  payload,
}: {
  payload: PartialCreateSponsorInterface & { id: number };
}): Promise<SponsorInterface | { error: string }> => {
  const cleanedPayload = omitBy(payload, val => !val && val !== 0);
  const formData = serialize(cleanedPayload, {
    indices: true,
    nullsAsUndefineds: true,
  });

  try {
    const response: SponsorInterface = await api
      .put(`admin/sponsors/${payload.id}`, {
        body: formData,
      })
      .json();
    customToast({
      title: 'Sponsors successfully updated!',
      type: ToastType.SUCCESS,
    });
    return response;
  } catch (error) {
    const errorMessage = 'Failed to edit sponsor';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const claimSponsor = async (
  payload: ClaimPayload
): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('claim-requests', {
        json: {
          ...payload,
          entityType: 'Sponsor',
          claimType: ClaimTypes.claimSponsorProfile,
        },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to claim sponsor';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};
