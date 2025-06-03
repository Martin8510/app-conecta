import React, { createContext, useContext, ReactNode } from "react";
import { IAuthService } from "../../application/";
import { Auth, BaseAuth } from "../../domain/model";
import { LocalStorageAuthPersister } from "../../infrastructure";

interface AuthContextType {
  signIn: (credentials: {
    userName: string;
    password: string;
  }) => Promise<Auth>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  user: Auth | null;
  userId: number | null;
  memberId: number | null;
  ownerId: number | null;
  adminId: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  authService: IAuthService;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authService,
}) => {
  const [user, setUser] = React.useState<Auth | null>(null);

  const signIn = async (credentials: BaseAuth) => {
    const authData = await authService.login(credentials);
    setUser(authData);
    return authData;
  };

  const signOut = async () => {
    const userLocalStorage =
      LocalStorageAuthPersister.getInstance().get() ?? null;

    if (!user && userLocalStorage) {
      setUser(userLocalStorage);
    }

    if (user?.token) {
      await authService.logout(user.token);
      setUser(null);
    }
  };

  const value = {
    signIn,
    signOut,
    isAuthenticated: !!user,
    user,
    userId: user?.idUser || null,
    memberId: user?.idMember || null,
    ownerId: user?.idOwner || null,
    adminId: user?.idAdmin || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
