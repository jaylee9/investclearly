import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import customToast, { ToastType } from '@/components/common/Toast/customToast';
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
    customToast({ title: errorMessage, type: ToastType.ERROR });
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
    customToast({
      title: 'Email successfully changed!',
      type: ToastType.SUCCESS,
    });
    return response;
  } catch (error) {
    const errorMessage = 'Failed to change email';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const deactivateAccount = async ({
  feedback,
}: {
  feedback: string;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const stringifiedParameters = queryString.stringify({ feedback });
    const response: { message: string } = await api
      .delete(`users?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to deactivate account';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};
