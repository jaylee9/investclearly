import { User } from "../entities/user.entity";

export const userMapper = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
