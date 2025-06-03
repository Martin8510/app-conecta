import { GroupError } from "./GroupError";

export class InvalidGroupNameError extends GroupError {
  constructor(name: string) {
    super(`El nombre del grupo '${name}' no es válido.`);
    this.name = "InvalidGroupNameError";
  }
}

export class InvalidDescriptionError extends GroupError {
  constructor() {
    super("La descripción debe tener entre 10 y 500 caracteres.");
    this.name = "InvalidDescriptionError";
  }
}

export class GroupAlreadyExistsError extends GroupError {
  constructor(name: string) {
    super(`Ya existe un grupo con el nombre '${name}'.`);
    this.name = "GroupAlreadyExistsError";
  }
}

export class CategoryNotFoundError extends GroupError {
  constructor(id: number) {
    super(`No se encontró la categoría con ID ${id}.`);
    this.name = "CategoryNotFoundError";
  }
}

export class ServerGroupError extends GroupError {
  constructor(message: string = "Error inesperado en el servidor de grupos.") {
    super(message);
    this.name = "ServerGroupError";
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
  timestamp: string;
  fieldErrors: IFieldErrorDetail[];
}
