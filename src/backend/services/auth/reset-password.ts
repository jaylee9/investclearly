import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import * as bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { AuthConstants } from '../../constants/auth-constants';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { DecodedTokenInterface } from './interfaces/decoded-token.interface';
import { loadEnvConfig } from '../../config/load-env-config';

loadEnvConfig();

export const resetUserPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  const connection = await getDatabaseConnection();
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }

  const decodedToken = jwt.verify(
    resetPasswordToken,
    jwtSecret
  ) as DecodedTokenInterface;

  const user = await connection.manager.findOne(User, {
    where: {
      id: decodedToken.id,
      email: decodedToken.email,
    },
  });

  if (!user) {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }

  if (decodedToken.expireAt <= moment().toISOString()) {
    throw new createHttpError.BadRequest(AuthConstants.invalidToken);
  }

  const password = await bcrypt.hash(newPassword, 10);
  await connection.manager.update(
    User,
    { id: user.id },
    {
      password,
    }
  );
};
