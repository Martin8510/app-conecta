import { Auth } from "../../domain/model";

export interface IAuthStorage {
  save(authData: Auth): void;
  get(): Auth | null;
  clear(): void;
}
