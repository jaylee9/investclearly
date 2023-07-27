import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import { ISponsorFilters } from '@/components/page/List/Sponsors/SponsorsFilters';
import api from '@/config/ky';
import queryString from 'query-string';

interface ISponsorActionFilters extends ISponsorFilters {
  page: number;
  pageSize: number;
  orderDirection?: 'DESC' | 'ASC';
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
  const parameters = {
    page: filters.page,
    pageSize: filters.pageSize,
    orderDirection: filters.orderDirection || 'DESC',
    primaryAssetClasses: filters.primaryAssetClasses,
    regionalFocus: filters.regionalFocus,
    activelyRaising: filters.activelyRaising,
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
