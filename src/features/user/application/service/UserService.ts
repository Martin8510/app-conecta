import { IUserService } from "../input/IUserService";
import { IUserPersister } from "../output/IUserPersister";
import { IBaseUser, IUser, IBaseRole } from "../../domain/model";
import {
  validateAddress,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateUserName,
  ValidationResult,
} from "../../domain/validation";
import {
  InvalidAddressFormatError,
  InvalidEmailFormatError,
  InvalidFirstNameFormatError,
  InvalidLastNameFormatError,
  InvalidPasswordFormatError,
  InvalidUserNameFormatError,
} from "../../domain/errors/UserDomainErrors";

type ValidationConfig = {
  result: ValidationResult;
  error: () => Error;
};

export class UserService implements IUserService {
  constructor(private userRepository: IUserPersister) {
    this.userRepository = userRepository;
  }

  async registerUser(user: IBaseUser) {
    this.validateUser(user);
    const role: IBaseRole[] = [];
    user.roles = role;
    return this.userRepository.create(user);
  }
  async updateUser(user: IUser) {
    this.validateUser(user);
    return this.userRepository.update(user);
  }

  validateUser(user: IBaseUser) {
    const validations: ValidationConfig[] = [
      {
        result: validateFirstName(user.firstName),
        error: () => new InvalidFirstNameFormatError(user.firstName),
      },
      {
        result: validateLastName(user.lastName),
        error: () => new InvalidLastNameFormatError(user.lastName),
      },
      {
        result: validateUserName(user.userName),
        error: () => new InvalidUserNameFormatError(user.userName),
      },
      {
        result: validateAddress(user.address),
        error: () => new InvalidAddressFormatError(user.address),
      },
      {
        result: validateEmail(user.email),
        error: () => new InvalidEmailFormatError(user.email),
      },
      {
        result: validatePassword(user.password),
        error: () => new InvalidPasswordFormatError(),
      },
    ];

    for (const { result, error } of validations) {
      if (!result.isValid) throw error();
    }
  }
}
