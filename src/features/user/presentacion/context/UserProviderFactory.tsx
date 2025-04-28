import React, { useMemo } from "react";
import { UserProvider } from "./UserContext";
import { UserService } from "../../application/service/UserService";
import { createFetchUserRepository } from "../../infrastructure/api";
import { IUserService } from "../../application/input/IUserService";

export const UserProviderWithService: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const userService = useMemo<IUserService>(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    return new UserService(createFetchUserRepository(baseUrl));
  }, []);

  return <UserProvider userService={userService}>{children}</UserProvider>;
};
