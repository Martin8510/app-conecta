import { Auth, BaseAuth } from "../../domain/model";

export interface IAuthPersister {
  authentication: (auth: BaseAuth) => Promise<Auth>;
  signOut: (token: string) => Promise<void>;
}
