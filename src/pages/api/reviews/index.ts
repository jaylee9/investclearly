import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { parseForm } from '../../../backend/utils/parse-form';
import { createReview } from '../../../backend/services/reviews/create-review';
import { CreateReviewInterface } from '../../../backend/services/reviews/interfaces/create-review.interface';
import { FindAllReviewsInterface } from '../../../backend/services/reviews/interfaces/get-all-reviews.interface';
import { getAllReviews } from '../../../backend/services/reviews/get-all-reviews';

export const config = {
  api: {
    bodyParser: false,
  },
};

const create = async (request: NextApiRequest, response: NextApiResponse) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const reviewDeal = await createReview(
    fields as unknown as CreateReviewInterface,
    files
  );

  if (reviewDeal) {
    response.status(200).json(reviewDeal);
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
