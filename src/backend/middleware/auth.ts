import { getCookies } from 'cookies-next';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseConnection } from '../config/data-source-config';
import { AuthConstants } from '../constants/auth-constants';
import { User } from '../entities/user.entity';
import { loadEnvConfig } from '../config/load-env-config';

loadEnvConfig();

interface AuthenticatedRequestWrapper {
  request: NextApiRequest;
  user?: User;
}

export const authMiddleware = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<AuthenticatedRequestWrapper> => {
  const token = getCookies({ req: request, res: response });

  if (!token.accessToken) {
    throw new createHttpError.Unauthorized(AuthConstants.unauthorized);
  }

  const { userId, email } = jwt.verify(
    token.accessToken,
    process.env.JWT_SECRET || ''
  ) as jwt.JwtPayload;
  const connection = await getDatabaseConnection();
  const user = await connection.manager.findOne(User, {
    where: { id: userId, email },
  });

  if (!user) {
    throw new createHttpError.Unauthorized(AuthConstants.unauthorized);
  }

  return { request, user };
};
