import { getCookies } from 'cookies-next';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseConnection } from '../config/data-source-config';
import { AuthConstants } from '../constants/auth-constants';
import { User } from '../entities/user.entity';
import { loadEnvConfig } from '../config/load-env-config';
import { Roles } from '../constants/enums/roles';

loadEnvConfig();

interface AuthenticatedRequestWrapper {
  request: NextApiRequest;
  user: User | null;
}

export const adminMiddleware = async (
  request: NextApiRequest,
  response: NextApiResponse,
  isOptional: boolean = false
): Promise<AuthenticatedRequestWrapper> => {
  const token = getCookies({ req: request, res: response });

  if (!isOptional && !token.accessToken) {
    throw new createHttpError.Unauthorized(AuthConstants.unauthorized);
  }

  let user: User | null = null;
  if (token.accessToken) {
    const { userId, email } = jwt.verify(
      token.accessToken,
      process.env.JWT_SECRET || ''
    ) as jwt.JwtPayload;
    const connection = await getDatabaseConnection();
    user = await connection.manager.findOne(User, {
      where: { id: userId, email },
    });

    if (!user && !isOptional) {
      throw new createHttpError.Unauthorized(AuthConstants.unauthorized);
    }

    if (user && (user.role !== Roles.admin || token.userRole !== Roles.admin)) {
      throw new createHttpError.Forbidden(AuthConstants.forbiddenResource);
    }
  }

  return { request, user };
};
