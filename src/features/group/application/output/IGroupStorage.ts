import { IGroup } from "../../domain/model";

export interface IGroupStorage {
  save(groupData: IGroup): void;
  get(): IGroup | null;
  clear(): void;
  getAll(): IGroup[];
  remove(id: number): void;
}
