import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../backend/middleware/auth';
import { apiHandler } from '../../../backend/utils/api-handler';
import { CreateInvestmentInterface } from '../../../backend/services/investments/interfaces/create-investment.interface';
import { FindAllInvestmentsInterface } from '../../../backend/services/investments/interfaces/get-all-investments.interface';
import { createinvestment } from '../../../backend/services/investments/create-investment';
import { getAllInvestments } from '../../../backend/services/investments/get-all-investments';

const addInvestment = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const body: CreateInvestmentInterface = authRequest.body;

  if (user) {
    const userId = user.id;

    const newInvestment = await createinvestment(body, userId);
    response.status(201).json(newInvestment);
  }
};

const getInvestments = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );

  if (user) {
    const params: FindAllInvestmentsInterface = authRequest.query;
    const userId = user.id;
    const investments = await getAllInvestments(params, userId);
    response.status(200).json(investments);
  }
};

export default apiHandler({ POST: addInvestment, GET: getInvestments });
