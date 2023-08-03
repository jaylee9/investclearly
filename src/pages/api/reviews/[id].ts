import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { apiHandler } from '../../../backend/utils/api-handler';
import { authMiddleware } from '../../../backend/middleware/auth';
import { parseForm } from '../../../backend/utils/parse-form';
import { ReviewConstants } from '../../../backend/constants/review-constants';
import { update } from '../../../backend/services/reviews/update-review';
import { UploadReviewProofsInterface } from '../../../backend/services/reviews/interfaces/upload-review-proofs.interface';
import { getReviewById } from '../../../backend/services/reviews/get-review-by-id';
import { deleteReviewRecord } from '../../../backend/services/reviews/delete-review';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadReviewProofs = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const { fields, files } = await parseForm(request, response);
  const id: number = Number(request.query.id);
  const updatedReview = await update(
    id,
    fields as unknown as UploadReviewProofsInterface,
    files
  );

  if (updatedReview) {
    response.status(200).json(updatedReview);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const deleteReview = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await authMiddleware(request, response);
  const id: number = Number(request.query.id);
  const reviewRecord = await getReviewById(id);

  if (reviewRecord) {
    await deleteReviewRecord(id);
  }
  response
    .status(200)
    .json({ message: ReviewConstants.reviewSuccessfullyDeleted });
};

export default apiHandler({
  PUT: uploadReviewProofs,
  DELETE: deleteReview,
});
