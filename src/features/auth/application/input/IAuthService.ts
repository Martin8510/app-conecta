import { Auth, BaseAuth } from "../../domain/model";

export interface IAuthService {
  login: (credentials: BaseAuth) => Promise<Auth>;
  logout: (token: string) => Promise<void>;
}
