import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import api from '@/config/ky';
import formatLocations from '@/helpers/formatLocations';

export interface GlobalSearchResponse {
  deals: DealInterface[];
  sponsors: SponsorInterface[];
}

export const globalSearch = async ({
  search = '',
}: {
  search?: string;
}): Promise<GlobalSearchResponse | { error: string }> => {
  try {
    const response: GlobalSearchResponse = await api
      .get('search', {
        searchParams: { search },
      })
      .json();
    return response;
  } catch (error) {
    return { error: 'Failed to fetch data for global search' };
  }
};

type GetLocationsResponse = { stateOrCountryDescription: string }[];

export const getLocations = async ({
  entityType,
}: {
  entityType: 'sponsor' | 'deal';
}): Promise<string[] | { error: string }> => {
  try {
    const response: GetLocationsResponse = await api
      .get('locations', {
        searchParams: { entityType },
      })
      .json();
    const formattedResponse: string[] = formatLocations(
      response.map(item => item.stateOrCountryDescription)
    );
    return formattedResponse;
  } catch (error) {
    return { error: 'Failed to fetch locations' };
  }
};
