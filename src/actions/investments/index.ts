import { FindAllInvestmentsInterface } from '@/backend/services/investments/interfaces/get-all-investments.interface';
import { InvestmentInterface } from '@/backend/services/investments/interfaces/investment.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';

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
}: FindAllInvestmentsInterface) => {
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
    console.error('Error fetching investments', error);
    throw error;
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
}: UpdateInvestment) => {
  try {
    await api.put(`investments/${id}`, {
      json: { dateOfInvestment, totalInvested },
    });
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};

export const deleteInvestment = async ({ id }: { id: number }) => {
  try {
    await api.delete(`investments/${id}`);
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};
