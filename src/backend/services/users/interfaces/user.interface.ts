import { ReviewInterface } from '../../reviews/interfaces/review.interface';

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  reviews: ReviewInterface[];
  createdAt: Date;
  updatedAt: Date;
}
