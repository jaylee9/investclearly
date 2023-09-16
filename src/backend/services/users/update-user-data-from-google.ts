import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { GoogleDataInterface } from '../auth/interfaces/google-data.interface';
import { getUserById } from './get-user-by-id';

export const updateUserDataFromGoogle = async (
  googleData: GoogleDataInterface,
  userId: number
) => {
  const connection = await getDatabaseConnection();
  const { firstName, lastName } = googleData;

  await connection.manager.update(
    User,
    { id: userId },
    { firstName, lastName }
  );
  return getUserById(userId);
};
