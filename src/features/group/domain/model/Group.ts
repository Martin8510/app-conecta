import { ICategory } from "./Category";

export interface IBaseGroup {
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  status: "ACTIVO" | "INACTIVO" | "PENDIENTE";
  category: ICategory;
}

export interface IGroup extends IBaseGroup {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number; // User ID
}

export interface IValidationGroupErrors {
  name?: string[];
  description?: string[];
  location?: string[];
  imageUrl?: string[];
  category?: string[];
}
