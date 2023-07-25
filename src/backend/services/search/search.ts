import { SearchConstants } from '@/backend/constants/search-constants';
import { getAllDeals } from '../deals/get-all-deals';
import { getAllSponsors } from '../sponsors/get-all-sponsors';
import { SearchInterface } from './interfaces/search.interface';

export const searchDealsAndSponsors = async (params: SearchInterface) => {
  const { search } = params;
  const dealsResponse = await getAllDeals({
    search,
    limit: SearchConstants.maxAmountOfDealsInSearch,
  });
  const sponsorsResponse = await getAllSponsors({
    search,
    limit: SearchConstants.maxAmountOfSponsorsInSearch,
  });

  return {
    deals: dealsResponse.deals,
    sponsors: sponsorsResponse.sponsors,
  };
};
