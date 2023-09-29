import { ClaimTypes } from '@/backend/constants/enums/claim-types';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { UpdateDealInterface } from '@/backend/services/deals/interfaces/update-deal.interface';
import customToast, { ToastType } from '@/components/common/Toast/customToast';
import { IFilters } from '@/components/page/List/Deals/DealsFilters';
import api from '@/config/ky';
import { ClaimPayload } from '@/types/common';
import { serialize } from 'object-to-formdata';
import queryString from 'query-string';

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
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const getDeal = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<DealInterface | { error: string }> => {
  try {
    const headers = token
      ? {
          Cookie: `accessToken=${token}`,
        }
      : {};
    const response: DealInterface = await api
      .get(`deals/${id}`, {
        headers,
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Error fetching deal';
    customToast({ title: errorMessage, type: ToastType.ERROR });
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
    customToast({ title: errorMessage, type: ToastType.ERROR });
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
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

type ModifiedUpdateDealInterface = UpdateDealInterface & {
  photoOfTheObjects?: Blob;
};

export type PartialEditDealInterface = Partial<ModifiedUpdateDealInterface>;

export const editDeal = async ({
  payload,
}: {
  payload: PartialEditDealInterface & { id: number };
}): Promise<DealInterface | { error: string }> => {
  const formData = serialize(payload, {
    indices: true,
    allowEmptyArrays: false,
  });

  try {
    const response: DealInterface = await api
      .put(`admin/deals/${payload.id}`, {
        body: formData,
      })
      .json();
    return response;
  } catch (error) {
    return { error: 'Failed to edit deal' };
  }
};

export const claimDeal = async (
  payload: ClaimPayload
): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('claim-requests', {
        json: {
          ...payload,
          entityType: 'Deal',
          claimType: ClaimTypes.claimDeal,
        },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to claim deal';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export interface SuggestEditDealPayload {
  businessEmail: string;
  businessPhone?: string;
  message: string;
  entityId: number;
}

export const suggestEditDeal = async (
  payload: SuggestEditDealPayload
): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .post('claim-requests', {
        json: {
          ...payload,
          phone: payload.businessPhone || '',
          jobTitle: '',
          entityType: 'Deal',
          claimType: ClaimTypes.suggestEditDeal,
        },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to claim deal';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};
