// src/features/auth/infrastructure/local/LocalStorageAuthPersister.ts
import { Auth } from "../../domain/model";
import { IAuthStorage } from "../../application/output";

const AUTH_KEY = "auth_data";

export class LocalStorageAuthPersister implements IAuthStorage {
  private static instance: LocalStorageAuthPersister;

  // Constructor privado para prevenir la creación de instancias con new
  private constructor() {}

  // Método estático para obtener la instancia única
  public static getInstance(): LocalStorageAuthPersister {
    if (!LocalStorageAuthPersister.instance) {
      LocalStorageAuthPersister.instance = new LocalStorageAuthPersister();
    }
    return LocalStorageAuthPersister.instance;
  }

  save(authData: Auth): void {
    try {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          userName: authData.userName,
          password: authData.password,
          token: authData.token,
          msg: authData.msg,
          idUser: authData.idUser,
          idMember: authData.idMember,
          idOwner: authData.idOwner,
          idAdmin: authData.idAdmin,
        })
      );
    } catch (error) {
      console.error("Error saving auth data to localStorage", error);
      throw new Error("Failed to save authentication data");
    }
  }

  get(): Auth | null {
    try {
      const userJson = localStorage.getItem(AUTH_KEY);
      if (!userJson) return null;

      const data = JSON.parse(userJson);
      return {
        userName: data.userName,
        password: data.password,
        token: data.token,
        msg: data.msg || "",
        idUser: data.idUser || null,
        idMember: data.idMember || null,
        idOwner: data.idOwner || null,
        idAdmin: data.idAdmin || null,
      };
    } catch (error) {
      console.error("Error reading auth data from localStorage", error);
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(AUTH_KEY);
  }
}

// Opcional: exportar una instancia predeterminada para conveniencia
export const localStorageAuthPersister =
  LocalStorageAuthPersister.getInstance();
