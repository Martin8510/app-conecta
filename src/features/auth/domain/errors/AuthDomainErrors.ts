import { AuthError } from "./AuthError";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from "../validation/AuthValidations";

export class InvalidPasswordFormatError extends AuthError {
  constructor() {
    super(
      `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidPasswordFormatError";
  }
}

export class InvalidTokenError extends AuthError {
  constructor() {
    super("El token no puede estar vacío.");
    this.name = "InvalidTokenError";
  }
}

export class InvalidUserNameFormatError extends AuthError {
  constructor(userName: string) {
    super(
      `El nombre de usuario '${userName}' debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres.`
    );
    this.name = "InvalidUserNameFormatError";
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("Credenciales inválidas, verifica tu usuario o contraseña.");
    this.name = "InvalidCredentialsError";
  }
}

export class UnauthorizedAccessError extends AuthError {
  constructor() {
    super("Acceso no autorizado. Necesitas iniciar sesión.");
    this.name = "UnauthorizedAccessError";
  }
}

export class ServerBaseDateError extends AuthError {
  constructor(
    message: string = "Un error inexperado con el servidor de la bd."
  ) {
    super(message);
    this.name = "ServerBaseDateError";
  }
}

export interface IFieldErrorDetail {
  field: string; // Nombre del campo donde ocurrió el error
  code: string; // Código del error
  message: string; // Mensaje descriptivo del error
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
