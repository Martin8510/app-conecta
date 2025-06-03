// features/group/infrastructure/storage/LocalStorageGroupPersister.ts
import { IGroup } from "../../domain/model";
import { IGroupStorage } from "../../application/output/IGroupStorage";

const GROUPS_KEY = "groups_data";
const CURRENT_GROUP_KEY = "current_group_data";

export class LocalStorageGroupPersister implements IGroupStorage {
  private static instance: LocalStorageGroupPersister;

  private constructor() {}

  public static getInstance(): LocalStorageGroupPersister {
    if (!LocalStorageGroupPersister.instance) {
      LocalStorageGroupPersister.instance = new LocalStorageGroupPersister();
    }
    return LocalStorageGroupPersister.instance;
  }

  save(groupData: IGroup): void {
    try {
      // Guardar grupo actual
      localStorage.setItem(CURRENT_GROUP_KEY, JSON.stringify(groupData));

      // Actualizar la lista de grupos
      const groups = this.getAll();
      const existingIndex = groups.findIndex((g) => g.id === groupData.id);

      if (existingIndex >= 0) {
        groups[existingIndex] = groupData;
      } else {
        groups.push(groupData);
      }

      localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    } catch (error) {
      console.error("Error saving group data to localStorage", error);
      throw new Error("Failed to save group data");
    }
  }

  get(): IGroup | null {
    try {
      const groupJson = localStorage.getItem(CURRENT_GROUP_KEY);
      return groupJson ? (JSON.parse(groupJson) as IGroup) : null;
    } catch (error) {
      console.error("Error reading current group from localStorage", error);
      return null;
    }
  }

  getAll(): IGroup[] {
    try {
      const groupsJson = localStorage.getItem(GROUPS_KEY);
      return groupsJson ? (JSON.parse(groupsJson) as IGroup[]) : [];
    } catch (error) {
      console.error("Error reading groups from localStorage", error);
      return [];
    }
  }

  remove(id: number): void {
    try {
      const groups = this.getAll().filter((group) => group.id !== id);
      localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));

      // Si el grupo eliminado es el actual, limpiar current
      const current = this.get();
      if (current && current.id === id) {
        this.clear();
      }
    } catch (error) {
      console.error("Error removing group from localStorage", error);
      throw new Error("Failed to remove group");
    }
  }

  clear(): void {
    localStorage.removeItem(CURRENT_GROUP_KEY);
  }
}

export const localStorageGroupPersister =
  LocalStorageGroupPersister.getInstance();
