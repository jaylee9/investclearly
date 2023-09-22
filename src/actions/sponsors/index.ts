import { CreateSponsorInterface } from '@/backend/services/sponsors/interfaces/create-sponsor.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import { ISponsorFilters } from '@/components/page/List/Sponsors/SponsorsFilters';
import api from '@/config/ky';
import notAuthorizedErrorHandler, {
  Roles,
} from '@/helpers/notAuthorizedErrorHandler';
import { HTTPError } from 'ky';
import { NextRouter } from 'next/router';
import { serialize } from 'object-to-formdata';
import queryString from 'query-string';
import { toast } from 'react-toastify';

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
    regionalFocus: filters.regionalFocus,
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
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

interface GetSponsorPayload {
  id: string;
  reviewsLimit: number;
  dealsLimit: number;
}

export const getSponsor = async ({
  id,
  reviewsLimit,
  dealsLimit,
}: GetSponsorPayload): Promise<SponsorInterface | { error: string }> => {
  try {
    const stringifiedParameters = queryString.stringify(
      { reviewsLimit, dealsLimit },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: SponsorInterface = await api
      .get(`sponsors/${id}?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to fetch sponsor';
    toast.error(errorMessage);
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
    toast.error(errorMessage);
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
    toast.error(errorMessage);
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
  router,
}: {
  payload: PartialCreateSponsorInterface;
  router: NextRouter;
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
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.ADMIN,
      });
    }
    return { error: 'Failed to create sponsor' };
  }
};

export const editSponsor = async ({
  payload,
  router,
}: {
  payload: PartialCreateSponsorInterface & { id: number };
  router: NextRouter;
}): Promise<SponsorInterface | { error: string }> => {
  const formData = serialize(payload, {
    indices: true,
    nullsAsUndefineds: true,
  });

  try {
    const response: SponsorInterface = await api
      .put(`admin/sponsors/${payload.id}`, {
        body: formData,
      })
      .json();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      notAuthorizedErrorHandler({
        status: error.response.status,
        router,
        role: Roles.ADMIN,
      });
    }
    return { error: 'Failed to edit sponsor' };
  }
};
