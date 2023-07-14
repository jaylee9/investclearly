import * as jwt from 'jsonwebtoken';
import { AuthConstants } from '../../constants/auth-constants';
import * as dotenv from 'dotenv';
import path from 'path';
import { UserInterface } from '../users/interfaces/user.interface';

dotenv.config({ path: path.join(__dirname, '../../../../.env') });

export const createToken = async (user: UserInterface) => {
  const expiresIn = AuthConstants.expiresInDay;
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET || '',
    { expiresIn },
  );
  return {
    expiresIn,
    accessToken,
  };
}
