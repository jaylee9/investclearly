import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { userMapper } from '../../mappers/user.mapper';
import { UserConstants } from '../../constants/users-constants';

export const getUserById = async (id: number) => {
  const connection = await getDatabaseConnection();

  const user = await connection.manager.findOne(User, {
    where: { id },
    relations: ['reviews'],
  });

  if (!user) {
    throw new createHttpError.NotFound(UserConstants.userNotFound);
  }

  return userMapper(user);
};
