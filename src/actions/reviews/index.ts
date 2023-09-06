import { CreateReviewInterface } from '@/backend/services/reviews/interfaces/create-review.interface';
import { FindAllReviewsInterface } from '@/backend/services/reviews/interfaces/get-all-reviews.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';
import { toast } from 'react-toastify';

export type OptionalCreateReviewInterface = Partial<CreateReviewInterface>;

export interface CreateReviewPayloadInterface
  extends OptionalCreateReviewInterface {
  file?: File | File[];
}

export const createReview = async (
  payload: CreateReviewPayloadInterface
): Promise<ReviewInterface | { error: string }> => {
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
    toast.success('Review successfuly created');
    return response.json();
  } catch (error) {
    const errorMessage = 'Failed to create review';
    toast.error(errorMessage);
    return { error: errorMessage };
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
}: FindAllReviewsInterface): Promise<
  GetUserReviewsResponse | { error: string }
> => {
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
    const errorMessage = 'Failed to fetch reviews';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const deleteReview = async ({
  id,
}: {
  id: number;
}): Promise<{ message: string } | { error: string }> => {
  try {
    const response: { message: string } = await api
      .delete(`reviews/${id}`)
      .json();
    toast.success('Review successfuly deleted');
    return response;
  } catch (error) {
    const errorMessage = 'Failed to delete reviews';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export interface UploadProofPayloadInterface {
  file: File | File[];
  reviewId: number;
}

export const uploadReviewProofs = async ({
  file,
  reviewId,
}: UploadProofPayloadInterface): Promise<ReviewInterface> => {
  const formData = new FormData();

  const fileValue = file;
  if (fileValue instanceof File) {
    formData.append('file', fileValue);
  } else if (Array.isArray(fileValue)) {
    for (let i = 0; i < fileValue.length; i++) {
      formData.append('file[]', fileValue[i]);
    }
  }

  try {
    const response = await api.put(`reviews/${reviewId}`, {
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.error('Error uploading review proof', error);
    throw error;
  }
};
