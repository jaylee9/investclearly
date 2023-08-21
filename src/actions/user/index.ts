import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import api from '@/config/ky';

export const getUser = async ({ id }: { id: string }) => {
  try {
    const response: PublicUserInterface = await api.get(`deals/${id}`).json();
    return response;
  } catch (error) {
    console.error('Error fetching user', error);
    throw error;
  }
};
