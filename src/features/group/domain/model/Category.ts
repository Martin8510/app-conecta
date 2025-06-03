export interface IBaseCategory {
  name: string;
  description: string;
}

export interface ICategory extends IBaseCategory {
  id: number;
}
