export interface BaseAuth {
  userName: string;
  password: string;
}

export interface Auth extends BaseAuth {
  userName: string;
  password: string;
  token: string;
}

export interface IValidationAuthErrors {
  username?: string[];
  password?: string[];
}
