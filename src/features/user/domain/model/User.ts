import { IBaseRole, IRole } from "./Role";

export interface IBaseUser {
  firstName: string;
  lastName: string;
  userName: string;
  address: string;
  email: string;
  password: string;
  roles: IBaseRole[] | IRole[];
}

interface ISecurity {
  isAccountNoExpired: boolean;
  isAccountNoLocked: boolean;
  isCredentialNoExpired: boolean;
}

export interface IUserResponse {
  userName: string;
  password: string;
  token?: string;
  msg?: string;
}

export interface IUser extends IBaseUser, ISecurity {
  id: number;
}

export interface IValidationUserErrors {
  firstName?: string[];
  lastName?: string[];
  userName?: string[];
  email?: string[];
  password?: string[];
  address?: string[];
}
