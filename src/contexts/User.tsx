import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { USER_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextProps {
  user: PublicUserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<PublicUserInterface | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<PublicUserInterface | null>(null);
  useEffect(() => {
    setUser(
      JSON.parse(
        localStorage.getItem(USER_OBJECT_LOCALSTORAGE_KEY) as string
      ) || null
    );
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
