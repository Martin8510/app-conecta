import { Auth, BaseAuth } from "../../domain/model";
import { IAuthPersister } from "../../application/output";
import {
  IErrorResponse,
  InvalidCredentialsError,
  ServerBaseDateError,
} from "../../domain/errors";

// Constantes bien organizadas
const API_ENDPOINTS = {
  SIGN_IN: "/auth/sign-in",
  SIGN_OUT: "/auth/sign-out",
} as const;

const HTTP_METHODS = {
  POST: "POST",
} as const;

const CONTENT_TYPE_HEADER = {
  "Content-Type": "application/json",
} as const;

const INVALID_CREDENTIALS_EXCEPTIONS = [
  "UserNotFoundException",
  "BadCredentialsException",
] as const;

// 🔍 Helper para parsear JSON seguro
const parseJsonSafe = async (response: Response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const createFetchAuthRepository = (baseUrl: string): IAuthPersister => {
  const handleError = (
    errorData: IErrorResponse | null,
    context: string
  ): never => {
    console.error(`API Error in ${context}:`, errorData);

    if (
      errorData?.exception &&
      INVALID_CREDENTIALS_EXCEPTIONS.some((exception) =>
        errorData.exception.includes(exception)
      )
    ) {
      throw new InvalidCredentialsError();
    }

    throw new ServerBaseDateError();
  };

  const handleNetworkError = (error: unknown, context: string): never => {
    console.error(`Network Error in ${context}:`, error);

    if (error instanceof InvalidCredentialsError) {
      throw error;
    }

    throw new ServerBaseDateError();
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
        handleError(data as IErrorResponse, context);
      }

      return data as T;
    } catch (error) {
      return handleNetworkError(error, context);
    }
  };

  return {
    authentication: (credentials: BaseAuth) =>
      fetchApi<Auth>(
        API_ENDPOINTS.SIGN_IN,
        {
          method: HTTP_METHODS.POST,
          headers: CONTENT_TYPE_HEADER,
          body: JSON.stringify(credentials),
        },
        "Authentication"
      ),

    signOut: (token: string) =>
      fetchApi<void>(
        API_ENDPOINTS.SIGN_OUT,
        {
          method: HTTP_METHODS.POST,
          headers: {
            ...CONTENT_TYPE_HEADER,
            Authorization: `Bearer ${token}`,
          },
        },
        "SignOut"
      ),
  };
};
