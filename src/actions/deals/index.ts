import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { IFilters } from '@/components/page/List/Deals/DealsFilters';
import api from '@/config/ky';
import queryString from 'query-string';
import { toast } from 'react-toastify';

interface IDealFilters extends IFilters {
  page: number;
  pageSize: number;
  orderDirection?: 'DESC' | 'ASC';
  search?: string;
  sponsorId?: number;
}

export interface RangeData {
  minInvestment: number;
  maxInvestment: number;
  minTargetIRR: number;
  maxTargetIRR: number;
  minActualIRR: number;
  maxActualIRR: number;
  minFee: number;
  maxFee: number;
  minPreferredReturn: number;
  maxPreferredReturn: number;
}
export interface GetAllDealsResponse {
  deals: DealInterface[];
  total: number;
  currentPage: number;
  lastPage: number;
  rangeData: RangeData;
}

export const getAllDeals = async (
  filters: IDealFilters
): Promise<GetAllDealsResponse | { error: string }> => {
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
    sponsorId: filters.sponsorId,
    preferredReturnMin: filters.preffered_return?.from,
    preferredReturnMax: filters.preffered_return?.to,
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
    const errorMessage = 'Failed to fetch deals';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const getDeal = async ({
  id,
}: {
  id: string;
}): Promise<DealInterface | { error: string }> => {
  try {
    const response: DealInterface = await api.get(`deals/${id}`).json();
    return response;
  } catch (error) {
    const errorMessage = 'Error fetching deal';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const addDealToBookmark = async ({
  entityId,
}: {
  entityId: number;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('bookmarks', { json: { entityType: 'Deal', entityId } })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to save deal';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const deleteDealFromBookmarks = async ({
  entityId,
}: {
  entityId: number;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const stringifiedParameters = queryString.stringify({
      entityId,
      entityType: 'Deal',
    });
    const response: { message: string } = await api
      .delete('bookmarks', { searchParams: stringifiedParameters })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to delete deal from saved';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
