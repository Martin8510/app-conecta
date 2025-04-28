export interface IBaseRole {
  name: string;
  permits: string[];
}

export interface IRole extends IBaseRole {
  id: number;
}
