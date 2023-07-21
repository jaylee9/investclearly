import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { IFilters } from '@/components/page/Deals/DealsFilters';
import api from '@/config/ky';

interface IDealFilters extends IFilters {
  page: number;
  pageSize: number;
}

export interface GetAllDealsResponse {
  deals: DealInterface[];
  total: number;
  currentPage: number;
  lastPage: number;
}

export const getAllDeals = async (
  filters: IDealFilters
): Promise<GetAllDealsResponse> => {
  const assetClasses = filters.asset_classes
    ?.map(ac => `assetClasses=${ac}`)
    .join('&');
  const statuses = filters.statuses
    ?.map(status => `statuses=${status}`)
    .join('&');
  const regions = filters.regions?.map(region => `regions=${region}`).join('&');
  const investmentStructures = filters.investment_structure
    ?.map(structure => `investmentStructures=${structure}`)
    .join('&');

  const IRRMin = filters.targetIRR?.from
    ? `IRRMin=${filters.targetIRR.from}`
    : '';
  const IRRMax = filters.targetIRR?.to ? `IRRMax=${filters.targetIRR.to}` : '';
  const investmentMinValue = filters.min_investment?.from
    ? `investmentMinValue=${filters.min_investment.from}`
    : '';
  const investmentMaxValue = filters.min_investment?.to
    ? `investmentMaxValue=${filters.min_investment.to}`
    : '';
  const sponsorFeesMin = filters.fees?.from
    ? `sponsorFeesMin=${filters.fees.from}`
    : '';
  const sponsorFeesMax = filters.fees?.to
    ? `sponsorFeesMax=${filters.fees.to}`
    : '';

  const params = [
    `page=${filters.page}`,
    `pageSize=${filters.pageSize}`,
    'orderDirection=ASC',
    assetClasses,
    statuses,
    regions,
    investmentStructures,
    IRRMin,
    IRRMax,
    investmentMinValue,
    investmentMaxValue,
    sponsorFeesMin,
    sponsorFeesMax,
  ];

  const url = `deals?${params.filter(Boolean).join('&')}`;

  try {
    const response: GetAllDealsResponse = await api.get(url).json();
    return response;
  } catch (error) {
    console.error('Error fetching deals', error);
    throw error;
  }
};
