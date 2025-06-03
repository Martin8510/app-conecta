export interface BaseAuth {
  userName: string;
  password: string;
}

export interface Auth extends BaseAuth {
  userName: string;
  password: string;
  token: string;
  msg: string;
  idUser: number | null;
  idMember: number | null;
  idOwner: number | null;
  idAdmin: number | null;
}

export interface IValidationAuthErrors {
  username?: string[];
  password?: string[];
}
