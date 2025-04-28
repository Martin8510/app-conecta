import React, { useMemo } from "react";
import { AuthProvider } from "./AuthContext";
import { AuthService } from "../../application/service/AuthService";
import { createFetchAuthRepository } from "../../infrastructure/";
import { LocalStorageAuthPersister } from "../../infrastructure/";

// Configuración de las dependencias del módulo auth
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProviderWithService: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const authService = useMemo(
    () =>
      new AuthService(
        createFetchAuthRepository(baseUrl),
        LocalStorageAuthPersister.getInstance()
      ),
    []
  );

  return <AuthProvider authService={authService}>{children}</AuthProvider>;
};
