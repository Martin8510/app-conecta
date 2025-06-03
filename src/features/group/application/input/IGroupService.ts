import { IBaseGroup, IGroup } from "../../domain/model";

export interface IGroupService {
  createGroup: (group: IBaseGroup) => Promise<IGroup>;
  updateGroup: (group: IGroup) => Promise<IGroup>;
  getGroups: () => Promise<IGroup[]>;
  deleteGroup: (id: number) => Promise<void>;
  getGroupById: (id: number) => Promise<IGroup>;
}
