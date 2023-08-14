import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { IFilters } from '@/components/page/List/Deals/DealsFilters';
import api from '@/config/ky';
import queryString from 'query-string';

interface IDealFilters extends IFilters {
  page: number;
  pageSize: number;
  orderDirection?: 'DESC' | 'ASC';
  search?: string;
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
    assetClasses: filters.asset_classes,
    statuses: filters.statuses,
    regions: filters.regions,
    investmentStructures: filters.investment_structure,
    exemption: filters.exemptions,
    targetIRRMin: filters.targetIRR?.from,
    targetIRRMax: filters.targetIRR?.to,
    actualIRRMin: filters.actualIRR?.from,
    actualIRRMax: filters.actualIRR?.to,
    investmentMinValue: filters.min_investment?.from,
    investmentMaxValue: filters.min_investment?.to,
    sponsorFeesMin: filters.fees?.from,
    sponsorFeesMax: filters.fees?.to,
    search: filters.search,
    regulations: filters.regulations,
    minRating,
    maxRating,
  };

  const stringifiedParameters = queryString.stringify(parameters, {
    arrayFormat: 'none',
    skipNull: true,
    skipEmptyString: true,
  });

  const url = `deals?${stringifiedParameters}`;

  try {
    const response: GetAllDealsResponse = await api.get(url).json();
    return response;
  } catch (error) {
    console.error('Error fetching deals', error);
    throw error;
  }
};

export const getDeal = async ({ id }: { id: string }) => {
  try {
    const response: DealInterface = await api.get(`deals/${id}`).json();
    return response;
  } catch (error) {
    console.error('Error fetching deal', error);
    throw error;
  }
};
