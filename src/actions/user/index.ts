import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import api from '@/config/ky';
import queryString from 'query-string';
import { toast } from 'react-toastify';

interface GetUserPayload {
  id: string;
  reviewsLimit: number;
  investmentsLimit: number;
}

export const getUser = async ({
  id,
  reviewsLimit,
  investmentsLimit,
}: GetUserPayload): Promise<PublicUserInterface | { error: string }> => {
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
    const errorMessage = 'Failed to fetch user';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

interface UpdateEmailPayload {
  newEmail: string;
  password: string;
}

export const updateEmail = async ({
  password,
  newEmail,
}: UpdateEmailPayload): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .put('auth/change-email', {
        json: { newEmail, password },
      })
      .json();
    toast.success('Email successfully changed!');
    return response;
  } catch (error) {
    const errorMessage = 'Failed to change email';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
