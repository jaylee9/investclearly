import { User } from '../entities/user.entity';
import { PublicUserInterface } from '../services/users/interfaces/public-user.interface';
import { buildFullImagePath } from '../utils/build-full-image-path';
import { reviewMapper } from './review.mapper';

export const userMapper = (user: User): PublicUserInterface => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture
      ? buildFullImagePath(user.profilePicture)
      : null,
    reviews: user.reviews ? user.reviews.map(reviewMapper) : [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
