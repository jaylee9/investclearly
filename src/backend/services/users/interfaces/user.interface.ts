export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
