import { IBaseGroup, IGroup } from "../../domain/model";

export interface IGroupPersister {
  create: (group: IBaseGroup) => Promise<IGroup>;
  update: (group: IGroup) => Promise<IGroup>;
  delete: (id: number) => Promise<void>;
  getById: (id: number) => Promise<IGroup>;
  getAll: () => Promise<IGroup[]>;
}
