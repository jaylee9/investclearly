import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { FindAllInvestmentsInterface } from '@/backend/services/investments/interfaces/get-all-investments.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';

interface GetAllInvestmentsPayload extends TPaginationInfo {
  deals: DealInterface[];
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
    const response: GetAllInvestmentsPayload = await api
      .get(`investments?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    console.error('Error fetching investments', error);
    throw error;
  }
};
