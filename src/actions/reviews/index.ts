import { CreateReviewInterface } from '@/backend/services/reviews/interfaces/create-review.interface';
import { FindAllReviewsInterface } from '@/backend/services/reviews/interfaces/get-all-reviews.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { TPaginationInfo } from '@/backend/utils/pagination/paginate-info.type';
import api from '@/config/ky';
import queryString from 'query-string';
import { serialize } from 'object-to-formdata';
import customToast, { ToastType } from '@/components/common/Toast/customToast';

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
    customToast({ title: errorMessage, type: ToastType.ERROR });
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
    customToast({ title: errorMessage, type: ToastType.ERROR });
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
    return response;
  } catch (error) {
    const errorMessage = 'Failed to delete reviews';
    customToast({ title: errorMessage, type: ToastType.ERROR });
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
  isReject?: boolean;
}

export const unpublishReview = async ({
  id,
  unpublishReviewMessage,
  reason,
  isReject,
}: UnpublishReviewPayload): Promise<ReviewInterface | { error: string }> => {
  try {
    const response: ReviewInterface = await api
      .put(`admin/reviews/${id}`, {
        json: { status: 'rejected', reason, unpublishReviewMessage },
      })
      .json();
    customToast({
      title: `Review was ${isReject ? 'rejected' : 'unpublished'}`,
      message: 'Email with explanation was sent to the reviewer ',
      type: ToastType.SUCCESS,
    });

    return response;
  } catch (error) {
    const errorMessage = `Failed to ${
      isReject ? 'reject' : 'unpublish'
    } review`;
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};

export const approveReview = async ({
  id,
}: {
  id: number;
}): Promise<ReviewInterface | { error: string }> => {
  try {
    const response: ReviewInterface = await api
      .put(`admin/reviews/${id}`, {
        json: { status: 'published' },
      })
      .json();
    customToast({
      title: 'Review has been successfully approved.',
      message: 'Email was sent to the reviewer ',
      type: ToastType.SUCCESS,
    });
    return response;
  } catch (error) {
    const errorMessage = 'Failed to approve review';
    customToast({ title: errorMessage, type: ToastType.ERROR });
    return { error: errorMessage };
  }
};
