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
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error("Error saving auth data to localStorage", error);
      throw new Error("Failed to save authentication data");
    }
  }

  get(): Auth | null {
    try {
      const userJson = localStorage.getItem(AUTH_KEY);
      return userJson ? (JSON.parse(userJson) as Auth) : null;
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
