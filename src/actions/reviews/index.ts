import { CreateReviewInterface } from '@/backend/services/reviews/interfaces/create-review.interface';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import api from '@/config/ky';

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
