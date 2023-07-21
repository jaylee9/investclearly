import { IFilters } from '@/components/page/Deals/DealsFilters';
import api from '@/config/ky';

export const getAllDeals = async (filters: IFilters) => {
  const assetClasses = filters.asset_classes
    .map(ac => `assetClasses=${ac}`)
    .join('&');
  const statuses = filters.statuses
    .map(status => `statuses=${status}`)
    .join('&');
  const regions = filters.regions.map(region => `regions=${region}`).join('&');
  const investmentStructures = filters.investment_structure
    .map(structure => `investmentStructures=${structure}`)
    .join('&');

  const url = `deals?page=1&pageSize=2&orderDirection=ASC&${assetClasses}&${statuses}&${regions}&${investmentStructures}&IRRMin=${filters.targetIRR.from}&IRRMax=${filters.targetIRR.to}&investmentMinValue=${filters.min_investment.from}&investmentMaxValue=${filters.min_investment.to}&sponsorFeesMin=${filters.fees.from}&sponsorFeesMax=${filters.fees.to}`;

  try {
    const response = await api.get(url).json();
    return response;
  } catch (error) {
    console.error('Error fetching deals', error);
    throw error;
  }
};
