export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  googleId: string;
  profilePicture?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
