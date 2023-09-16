import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { DeepPartial } from 'typeorm';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { parseForm } from '../../../backend/utils/parse-form';
import { createReview } from '../../../backend/services/reviews/create-review';
import { FindAllReviewsInterface } from '../../../backend/services/reviews/interfaces/get-all-reviews.interface';
import { getAllReviews } from '../../../backend/services/reviews/get-all-reviews';
import { Review } from '../../../backend/entities/reviews.entity';

export const config = {
  api: {
    bodyParser: false,
  },
};

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const { fields, files } = await parseForm(authRequest, response);
  const userId = user?.id;
  const review = await createReview(
    userId!,
    fields as unknown as DeepPartial<Review>,
    files
  );

  if (review) {
    response.status(200).json(review);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getReviews = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const params: FindAllReviewsInterface = request.query;

  const reviews = await getAllReviews(params);
  response.status(200).json(reviews);
};

export default apiHandler({ POST: create, GET: getReviews });
