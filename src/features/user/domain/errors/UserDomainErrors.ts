import { UserError } from "./UserError";
import {
  ADDRESS_MAX_LENGTH,
  ADDRESS_MIN_LENGTH,
  FIRSTNAME_MAX_LENGTH,
  FIRSTNAME_MIN_LENGTH,
  LASTNAME_MAX_LENGTH,
  LASTNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../validation/UserValidations";

export class InvalidFirstNameFormatError extends UserError {
  constructor(name: string) {
    super(
      `El apellido '${name}' debe tener entre ${LASTNAME_MIN_LENGTH} y ${LASTNAME_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidFirstNameFormatError";
  }
}

export class InvalidLastNameFormatError extends UserError {
  constructor(name: string) {
    super(
      `El nombre '${name}' debe tener entre ${FIRSTNAME_MIN_LENGTH} y ${FIRSTNAME_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidLastNameFormatError";
  }
}

export class InvalidUserNameFormatError extends UserError {
  constructor(userName: string) {
    super(
      `El nombre de usuario '${userName}' debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidUserNameFormatError";
  }
}

export class InvalidEmailFormatError extends UserError {
  constructor(email: string) {
    super(`El correo '${email}' no es válido.`);
    this.name = "InvalidEmailFormatError";
  }
}

export class InvalidPasswordFormatError extends UserError {
  constructor() {
    super(
      `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidPasswordFormatError";
  }
}

export class InvalidAddressFormatError extends UserError {
  constructor(address: string) {
    super(
      `La dirección '${address}' debe tener entre ${ADDRESS_MIN_LENGTH} y ${ADDRESS_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidAddressFormatError";
  }
}

export class UserNameAlreadyExistsException extends UserError {
  constructor(userName: string) {
    super(
      `El nombre de usuario '${userName}' ya está registrado por otro usuario.`
    );
    this.name = "UserAlreadyExistsError";
  }
}
export class EmailAlreadyExistsException extends UserError {
  constructor(email: string) {
    super(`Ya existe un usuario registrado con el correo '${email}'.`);
    this.name = "UserAlreadyExistsError";
  }
}

export class UserNotFoundException extends UserError {
  constructor(userId: number) {
    super(`No se encontró el usuario con identificador '${userId}'.`);
    this.name = "UserNotFoundError";
  }
}

export class ServerBaseDateError extends UserError {
  constructor(
    message: string = "Un error inexperado con el servidor de la bd."
  ) {
    super(message);
    this.name = "ServerBaseDateError";
  }
}

export interface IFieldErrorDetail {
  field: string;
  code: string;
  message: string;
}

export interface IErrorResponse {
  exception: string;
  code: string;
  message: string;
  path: string;
  details: string[];
  timestamp: string; // ISO 8601 string para fecha y hora
  fieldErrors: IFieldErrorDetail[];
}
