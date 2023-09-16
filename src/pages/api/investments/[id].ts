import { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import { authMiddleware } from '../../../backend/middleware/auth';
import { apiHandler } from '../../../backend/utils/api-handler';
import { AuthConstants } from '../../../backend/constants/auth-constants';
import { InvestmentConstants } from '../../../backend/constants/investment-constants';
import { getInvestmentById } from '../../../backend/services/investments/get-investment-by-id';
import { updateInvestmentRecord } from '../../../backend/services/investments/update-investment';
import { UpdateInvestmentInterface } from '../../../backend/services/investments/interfaces/update-investment.interface';
import { deleteInvestmentRecord } from '../../../backend/services/investments/delete-investment';

const updateInvestment = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );

  const body: UpdateInvestmentInterface = authRequest.body;
  let investmentRecord = null;
  const id: number = Number(authRequest.query.id);

  if (user) {
    const userId = user.id;
    investmentRecord = await updateInvestmentRecord(id, body, userId);
  }

  if (investmentRecord) {
    response.status(200).json(investmentRecord);
  } else {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }
};

const getInvestment = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );

  if (user) {
    const id: number = Number(authRequest.query.id);
    const userId = user.id;
    const investmentRecord = await getInvestmentById(id, userId);
    response.status(200).json(investmentRecord);
  }
};

const deleteInvestment = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );

  if (user) {
    const id: number = Number(authRequest.query.id);
    const userId = user.id;
    const investmentRecord = await getInvestmentById(id, userId);

    if (investmentRecord) {
      await deleteInvestmentRecord(id, userId);
    }
  }
  response
    .status(200)
    .json({ message: InvestmentConstants.investmentSuccessfullyDeleted });
};

export default apiHandler({
  PUT: updateInvestment,
  GET: getInvestment,
  DELETE: deleteInvestment,
});
