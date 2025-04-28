import { IBaseUser, IUser, IUserResponse } from "../../domain/model";

export interface IUserService {
  registerUser: (user: IBaseUser) => Promise<IUserResponse>;
  updateUser: (user: IUser) => Promise<IUser>;
}
