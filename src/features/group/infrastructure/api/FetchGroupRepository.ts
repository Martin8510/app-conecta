import { IBaseGroup, IGroup } from "../../domain/model";
import { IGroupPersister } from "../../application/output/IGroupPersister";
import {
  IErrorResponse,
  GroupAlreadyExistsError,
  CategoryNotFoundError,
  ServerGroupError,
} from "../../domain/errors/GroupDomainErrors";
import { localStorageAuthPersister } from "../../../auth/infrastructure";
import { Auth } from "../../../auth";

// Definimos los tipos de excepciones como constantes
const GROUP_ALREADY_EXISTS_EXCEPTION = "GroupAlreadyExistsException" as const;
const CATEGORY_NOT_FOUND_EXCEPTION = "CategoryNotFoundError" as const;

const API_ENDPOINTS = {
  CREATE_GROUP: (id: number) => `/group/create/${id}`,
  UPDATE_GROUP: (id: number) => `/group/update/${id}`,
  GET_GROUPS: "/group/find-all",
  GET_GROUP: (id: number) => `/group/find/${id}`,
  DELETE_GROUP: (id: number) => `/group/delete/${id}`,
} as const;

const HTTP_METHODS = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
} as const;

const CONTENT_TYPE_HEADER = {
  "Content-Type": "application/json",
} as const;

const parseJsonSafe = async (response: Response) => {
  const text = await response.text();
  // Si la respuesta está vacía o es texto plano, devolvemos el texto
  if (!text || (!text.trim().startsWith("{") && !text.trim().startsWith("["))) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return text;
  }
};

export const createFetchGroupRepository = (
  baseUrl: string
): IGroupPersister => {
  let groupName: string;
  let categoryId: number;
  let memberId: number;

  const getAuth = (): Auth | never => {
    const authData = localStorageAuthPersister.get();
    if (!authData) {
      throw new ServerGroupError(`Error inesperado en ${authData}`);
    }
    return authData;
  };

  const getAuthToken = (): string => {
    const authData = getAuth();
    return authData?.token || "";
  };

  const getHeaders = () => {
    const token = getAuthToken();
    return {
      ...CONTENT_TYPE_HEADER,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const handleError = (
    status: number,
    errorData: IErrorResponse,
    context: string
  ): never => {
    console.error(`API Error in ${context}:`, errorData);

    const exception = errorData?.exception;

    if (exception === GROUP_ALREADY_EXISTS_EXCEPTION) {
      throw new GroupAlreadyExistsError(groupName);
    }

    if (exception === CATEGORY_NOT_FOUND_EXCEPTION) {
      throw new CategoryNotFoundError(categoryId);
    }

    throw new ServerGroupError(`HTTP ${status} en ${context}`);
  };

  const handleNetworkError = (error: unknown, context: string): never => {
    console.error(`Network Error in ${context}:`, error);

    if (
      error instanceof GroupAlreadyExistsError ||
      error instanceof CategoryNotFoundError
    ) {
      throw error;
    }

    throw new ServerGroupError(`Error inesperado en ${context}`);
  };

  const fetchApi = async <T>(
    endpoint: string,
    options: RequestInit,
    context: string
  ): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: getHeaders(),
      });
      const data = await parseJsonSafe(response);

      if (!response.ok) {
        handleError(response.status, data, context);
      }

      // Para DELETE exitoso, devolvemos true como indicador de éxito
      if (options.method === HTTP_METHODS.DELETE && response.ok) {
        return true as unknown as T;
      }

      return data as T;
    } catch (error) {
      return handleNetworkError(error, context);
    }
  };

  return {
    create: (group: IBaseGroup) => {
      memberId = getAuth().idMember as number;
      categoryId = group.category.id;
      if (getAuth().idMember == null) {
        throw new ServerGroupError(
          `Error inesperado al obtener idMember: ${getAuth().idMember}`
        );
      }

      return fetchApi<IGroup>(
        API_ENDPOINTS.CREATE_GROUP(memberId),
        {
          method: HTTP_METHODS.POST,
          body: JSON.stringify(group),
        },
        "Create Group"
      );
    },

    update: (group: IGroup) => {
      groupName = group.name;
      return fetchApi<IGroup>(
        API_ENDPOINTS.UPDATE_GROUP(group.id),
        {
          method: HTTP_METHODS.PUT,
          body: JSON.stringify(group),
        },
        "Update Group"
      );
    },

    delete: async (id: number) => {
      const result = await fetchApi<boolean>(
        API_ENDPOINTS.DELETE_GROUP(id),
        {
          method: HTTP_METHODS.DELETE,
        },
        "Delete Group"
      );
      // Verificamos que la operación fue exitosa
      if (result !== true) {
        throw new ServerGroupError(
          "No se pudo confirmar la eliminación del grupo"
        );
      }
    },

    getById: (id: number) => {
      return fetchApi<IGroup>(
        API_ENDPOINTS.GET_GROUP(id),
        {
          method: HTTP_METHODS.GET,
        },
        "Get Group by ID"
      );
    },

    getAll: () => {
      return fetchApi<IGroup[]>(
        API_ENDPOINTS.GET_GROUPS,
        {
          method: HTTP_METHODS.GET,
        },
        "Get Groups"
      );
    },
  };
};
