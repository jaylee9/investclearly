import { CreateReviewInterface } from '@/backend/services/reviews/interfaces/create-review.interface';
import { FindAllReviewsInterface } from '@/backend/services/reviews/interfaces/get-all-reviews.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';

export type OptionalCreateReviewInterface = Partial<CreateReviewInterface>;

export interface CreateReviewPayloadInterface
  extends OptionalCreateReviewInterface {
  file?: File | File[];
}

export const createReview = async (
  payload: CreateReviewPayloadInterface
): Promise<ReviewInterface> => {
  const formData = new FormData();

  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      const valueKey = key as keyof CreateReviewPayloadInterface;
      const value = payload[valueKey];
      if (value === undefined) continue;
      if (typeof value === 'string' || value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        formData.append(key, value.toString());
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i]);
        }
      }
    }
  }

  try {
    const response = await api.post('reviews', {
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.error('Error create review', error);
    throw error;
  }
};

export interface GetUserReviewsResponse extends TPaginationInfo {
  reviews: ReviewInterface[];
  totalUnverifiedReviews: number;
}

export const getUserReviews = async ({
  page,
  pageSize,
  orderDirection,
  status,
  search,
  userId,
}: FindAllReviewsInterface) => {
  try {
    const stringifiedParameters = queryString.stringify(
      { page, pageSize, orderDirection, status, search, userId },
      {
        arrayFormat: 'none',
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response: GetUserReviewsResponse = await api
      .get(`reviews?${stringifiedParameters}`)
      .json();
    return response;
  } catch (error) {
    console.error('Error fetching reviews', error);
    throw error;
  }
};

export const deleteReview = async ({ id }: { id: number }) => {
  try {
    await api.delete(`reviews/${id}`);
    return { isError: false };
  } catch (error) {
    return { isError: true };
  }
};
