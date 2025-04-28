import { IBaseUser, IUser, IUserResponse } from "../../domain/model";

export interface IUserPersister {
  create: (user: IBaseUser) => Promise<IUserResponse>;
  update: (user: IUser) => Promise<IUser>;
}
