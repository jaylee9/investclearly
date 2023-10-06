import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../backend/middleware/auth';
import { apiHandler } from '../../../backend/utils/api-handler';
import { CreateClaimRequestInterface } from '../../../backend/services/claim-requests/interfaces/create-claim-request.interface';
import { createClaimRequest } from '../../../backend/services/claim-requests/create-claim-request';
import { dealsVisibilityMiddleware } from '../../../backend/middleware/deals-visibility';

const claimRequest = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { request: authRequest, user } = await authMiddleware(
    request,
    response
  );
  const showOnlyPublishedDeals = dealsVisibilityMiddleware(user);
  const body: CreateClaimRequestInterface = authRequest.body;

  if (user) {
    const userId = user.id;

    const newClaimRequest = await createClaimRequest(
      body,
      userId,
      showOnlyPublishedDeals
    );
    response.status(201).json(newClaimRequest);
  }
};

export default apiHandler({ POST: claimRequest });
