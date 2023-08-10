import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../backend/utils/api-handler';
import { getUserById } from '../../../backend/services/users/get-user-by-id';

const getUser = async (request: NextApiRequest, response: NextApiResponse) => {
  const id: number = Number(request.query.id);
  const userRecord = await getUserById(id);
  response.status(200).json(userRecord);
};

export default apiHandler({
  GET: getUser,
});
