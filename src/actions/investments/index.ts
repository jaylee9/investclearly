import { FindAllInvestmentsInterface } from '@/backend/services/investments/interfaces/get-all-investments.interface';
import { InvestmentInterface } from '@/backend/services/investments/interfaces/investment.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';
import { toast } from 'react-toastify';

export interface GetAllInvestmentsResponse extends TPaginationInfo {
  deals: InvestmentInterface[];
  totalInvested: number;
}

export const getAllInvestments = async ({
  page,
  pageSize,
  orderDirection,
  status,
  search,
}: FindAllInvestmentsInterface): Promise<
  GetAllInvestmentsResponse | { error: string }
> => {
  try {
    const stringifiedParameters = queryString.stringify(
      { page, pageSize, orderDirection, status, search },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: GetAllInvestmentsResponse = await api
      .get(`investments?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to fetch investments';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

interface UpdateInvestment {
  dateOfInvestment: string;
  totalInvested: string;
  id: number;
}

export const updateInvestment = async ({
  dateOfInvestment,
  totalInvested,
  id,
}: UpdateInvestment): Promise<InvestmentInterface | { error: string }> => {
  try {
    const response: InvestmentInterface = await api
      .put(`investments/${id}`, {
        json: { dateOfInvestment, totalInvested },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to update investment';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const deleteInvestment = async ({
  id,
}: {
  id: number;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .delete(`investments/${id}`)
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to delete investment';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
