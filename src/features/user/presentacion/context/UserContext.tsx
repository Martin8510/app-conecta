import React, { createContext, useContext, ReactNode } from "react";
import { IUserService } from "../../application/input/IUserService";
import { IBaseUser, IUser, IUserResponse } from "../../domain/model";

interface UserContextType {
  registerUser: (user: IBaseUser) => Promise<IUserResponse>;
  updateUser: (user: IUser) => Promise<IUser>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  userService: IUserService;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  userService,
}) => {
  const registerUser = async (user: IBaseUser) => {
    return await userService.registerUser(user);
  };

  const updateUser = async (user: IUser) => {
    return await userService.updateUser(user);
  };

  const value = {
    registerUser,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
