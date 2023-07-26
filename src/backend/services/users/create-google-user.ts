import { getDatabaseConnection } from '../../config/data-source-config';
import { User } from '../../entities/user.entity';
import { getUserById } from './get-user-by-id';
import { GoogleDataInterface } from '../auth/interfaces/google-data.interface';

export const createGoogleUser = async (googleData: GoogleDataInterface) => {
  const connection = await getDatabaseConnection();
  const { googleId, email, firstName, lastName, profilePicture } = googleData;
  const user = connection.manager.create(User, {
    googleId,
    profilePicture,
    firstName,
    lastName,
    email,
  });

  await connection.manager.save(user);
  return getUserById(user.id);
};
