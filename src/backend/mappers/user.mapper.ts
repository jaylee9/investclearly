import { User } from '../entities/user.entity';
import { buildFullImagePath } from '../utils/build-full-image-path';

export const userMapper = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture
      ? buildFullImagePath(user.profilePicture)
      : null,
    sponsors: user.sponsors || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
