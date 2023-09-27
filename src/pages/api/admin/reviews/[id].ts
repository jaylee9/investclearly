import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../../backend/constants/auth-constants';
import { apiHandler } from '../../../../backend/utils/api-handler';
import { adminMiddleware } from '../../../../../src/backend/middleware/admin';
import { getReviewById } from '../../../../backend/services/reviews/get-review-by-id';
import { ModerateReviewInterface } from '../../../../backend/services/reviews/interfaces/moderate-review.interface';
import { moderate } from '../../../../backend/services/reviews/moderate-review';

const moderateReview = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await adminMiddleware(request, response);
  const id: number = Number(request.query.id);
  const body: ModerateReviewInterface = request.body;

  const moderatedReview = await moderate(id, body);

  if (moderatedReview) {
    response.status(200).json(moderatedReview);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getReview = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await adminMiddleware(request, response);
  const id: number = Number(request.query.id);
  const reviewRecord = await getReviewById(id);
  response.status(200).json(reviewRecord);
};

export default apiHandler({
  PUT: moderateReview,
  GET: getReview,
});
