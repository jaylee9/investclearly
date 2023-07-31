import * as jwt from 'jsonwebtoken';
import { AuthConstants } from '../../constants/auth-constants';
import { UserInterface } from '../users/interfaces/user.interface';
import { loadEnvConfig } from '../../config/load-env-config';

loadEnvConfig();

export const createToken = (user: UserInterface) => {
  const expiresIn = AuthConstants.expiresInDay;
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET || '',
    { expiresIn }
  );
  return {
    expiresIn,
    accessToken,
  };
};
