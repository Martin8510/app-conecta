import {
  InvalidCredentialsError,
  InvalidPasswordFormatError,
  InvalidTokenError,
  InvalidUserNameFormatError,
  UnauthorizedAccessError,
} from "../../domain/errors/AuthDomainErrors";
import { Auth, BaseAuth } from "../../domain/model";
import {
  validatePassword,
  validateUsername,
  validateToken,
  ValidationResult,
} from "../../domain/validation/AuthValidations";

import { IAuthService } from "../input";
import { IAuthPersister, IAuthStorage } from "../output";

type ValidationConfig = {
  result: ValidationResult;
  error: () => Error;
};

export class AuthService implements IAuthService {
  constructor(
    private readonly authPersister: IAuthPersister,
    private readonly authStorage: IAuthStorage
  ) {}

  async login(credentials: BaseAuth): Promise<Auth> {
    this.validateAuthUser(credentials);

    const auth = await this.authPersister.authentication(credentials);
    if (!auth) {
      throw new InvalidCredentialsError();
    }
    this.authStorage.save(auth);
    return auth;
  }

  async logout(token: string): Promise<void> {
    try {
      this.validateUserToken(token);
      // await this.authPersister.signOut(token);
      console.log("service logout");
      this.authStorage.clear();
    } catch {
      throw new UnauthorizedAccessError();
    }
  }

  loadAuthData(storage: IAuthStorage): Auth | null {
    return storage.get();
  }

  validateAuthUser(credentials: BaseAuth) {
    const { userName, password } = credentials;

    const validations: ValidationConfig[] = [
      {
        result: validateUsername(userName),
        error: () => new InvalidUserNameFormatError(userName),
      },
      {
        result: validatePassword(password),
        error: () => new InvalidPasswordFormatError(),
      },
    ];

    for (const { result, error } of validations) {
      if (!result.isValid) throw error();
    }
  }

  validateUserToken(token: string) {
    const tokenValidation = validateToken(token);

    if (!tokenValidation.isValid) {
      throw new InvalidTokenError();
    }
  }
}
