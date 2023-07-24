import { User } from '../entities/user.entity';

export const userMapper = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture || null,
    sponsors: user.sponsors || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
