import { ReviewInterface } from '../../reviews/interfaces/review.interface';
import { UserInterface } from './user.interface';

export interface PublicUserInterface extends UserInterface {
  reviews?: ReviewInterface[] | null;
}
