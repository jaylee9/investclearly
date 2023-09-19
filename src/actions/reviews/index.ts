import { CreateReviewInterface } from '@/backend/services/reviews/interfaces/create-review.interface';
import { FindAllReviewsInterface } from '@/backend/services/reviews/interfaces/get-all-reviews.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { serialize } from 'object-to-formdata';

export type OptionalCreateReviewInterface = Partial<CreateReviewInterface>;

export interface CreateReviewPayloadInterface
  extends OptionalCreateReviewInterface {
  file?: File | File[];
}

export const createReview = async (
  payload: CreateReviewPayloadInterface
): Promise<ReviewInterface | { error: string }> => {
  const formData = serialize(payload, {
    indices: true,
    nullsAsUndefineds: true,
    booleansAsIntegers: true,
  });

  try {
    const response = await api.post('reviews', {
      body: formData,
    });
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
  const formData = serialize({ file: file }, { indices: true });

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

interface UnpublishReviewPayload {
  id: number;
  unpublishReviewMessage?: string;
  reason: string;
}

export const unpublishReview = async ({
  id,
  unpublishReviewMessage,
  reason,
}: UnpublishReviewPayload): Promise<ReviewInterface | { error: string }> => {
  try {
    const response: ReviewInterface = await api
      .put(`admin/reviews/${id}`, {
        json: { status: 'rejected', reason, unpublishReviewMessage },
      })
      .json();
    return response;
  } catch (error) {
    const errorMessage = 'Failed to unpublish review';
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};
