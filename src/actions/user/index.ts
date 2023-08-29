import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import api from '@/config/ky';
import queryString from 'query-string';

interface GetUserPayload {
  id: string;
  reviewsLimit: number;
  investmentsLimit: number;
}

export const getUser = async ({
  id,
  reviewsLimit,
  investmentsLimit,
}: GetUserPayload) => {
  try {
    const stringifiedParameters = queryString.stringify(
      { reviewsLimit, investmentsLimit },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: PublicUserInterface = await api
      .get(`users/${id}?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    console.error('Error fetching user', error);
    throw error;
  }
};
