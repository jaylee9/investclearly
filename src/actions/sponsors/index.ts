import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import { ISponsorFilters } from '@/components/page/List/Sponsors/SponsorsFilters';
import api from '@/config/ky';
import queryString from 'query-string';

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
): Promise<GetAllSponsorsResponse> => {
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
    console.error('Error fetching deals', error);
    throw error;
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
}: GetSponsorPayload) => {
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
    console.error('Error fetching deal', error);
    throw error;
  }
};
