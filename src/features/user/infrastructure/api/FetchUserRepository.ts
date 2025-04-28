import { IBaseUser, IUser, IUserResponse } from "../../domain/model";
import { IUserPersister } from "../../application/output/IUserPersister";
import {
  IErrorResponse,
  ServerBaseDateError,
  UserNameAlreadyExistsException,
  EmailAlreadyExistsException,
  UserNotFoundException,
} from "../../domain/errors/UserDomainErrors";

const API_ENDPOINTS = {
  SIGN_UP: "/member/signup",
  UPDATE: (id: number) => `/member/update/${id}`,
} as const;

const HTTP_METHODS = {
  POST: "POST",
  PUT: "PUT",
} as const;

const CONTENT_TYPE_HEADER = {
  "Content-Type": "application/json",
} as const;

const USER_DOMAIN_EXCEPTIONS = {
  USER_ALREADY_EXISTS: [
    "UserNameAlreadyExistsException",
    "EmailAlreadyExistsException",
  ],
  USER_NOT_FOUND: ["UserNotFoundError"],
};

const parseJsonSafe = async (response: Response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const createFetchUserRepository = (baseUrl: string): IUserPersister => {
  let userName: string;
  let userEmail: string;
  let userId: number;

  const handleError = (
    status: number,
    errorData: IErrorResponse,
    context: string
  ): never => {
    console.error(`API Error in ${context}:`, errorData);

    const exception = errorData?.exception;

    if (exception) {
      const indexException =
        USER_DOMAIN_EXCEPTIONS.USER_ALREADY_EXISTS.indexOf(exception);

      if (
        USER_DOMAIN_EXCEPTIONS.USER_ALREADY_EXISTS[indexException] ==
        "UserNameAlreadyExistsException"
      ) {
        throw new UserNameAlreadyExistsException(userName);
      }

      if (
        USER_DOMAIN_EXCEPTIONS.USER_ALREADY_EXISTS[indexException] ==
        "EmailAlreadyExistsException"
      ) {
        throw new EmailAlreadyExistsException(userEmail);
      }

      if (USER_DOMAIN_EXCEPTIONS.USER_NOT_FOUND.includes(exception) && userId) {
        throw new UserNotFoundException(userId);
      }
    }

    throw new ServerBaseDateError(`HTTP ${status} en ${context}`);
  };

  const handleNetworkError = (error: unknown, context: string): never => {
    console.error(`Network Error in ${context}:`, error);

    if (
      error instanceof EmailAlreadyExistsException ||
      error instanceof UserNameAlreadyExistsException ||
      error instanceof UserNotFoundException
    ) {
      throw error;
    }

    throw new ServerBaseDateError(`Error inesperado en ${context}`);
  };

  const fetchApi = async <T>(
    endpoint: string,
    options: RequestInit,
    context: string
  ): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);
      const data = await parseJsonSafe(response);

      if (!response.ok) {
        handleError(response.status, data, context);
      }

      return data as T;
    } catch (error) {
      return handleNetworkError(error, context);
    }
  };

  return {
    create: (user: IBaseUser) => {
      userName = user.userName;
      userEmail = user.email;

      return fetchApi<IUserResponse>(
        API_ENDPOINTS.SIGN_UP,
        {
          method: HTTP_METHODS.POST,
          headers: CONTENT_TYPE_HEADER,
          body: JSON.stringify({ user }),
        },
        "Create User"
      );
    },

    update: (user: IUser) => {
      userId = user.id;
      if (!user.id) {
        throw new Error("No se puede actualizar un usuario sin ID.");
      }

      return fetchApi<IUser>(
        API_ENDPOINTS.UPDATE(user.id),
        {
          method: HTTP_METHODS.PUT,
          headers: CONTENT_TYPE_HEADER,
          body: JSON.stringify({ user }),
        },
        "Update User"
      );
    },
  };
};
