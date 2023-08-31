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
}: FindAllInvestmentsInterface) => {
  try {
    const stringifiedParameters = queryString.stringify(
      { page, pageSize, orderDirection, status },
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
