// features/group/application/service/GroupService.ts
import { IGroupService } from "../input/IGroupService";
import { IGroupPersister, IGroupStorage } from "../output";
import { IBaseGroup, IGroup } from "../../domain/model";
import {
  validateGroupName,
  validateDescription,
  validateLocation,
  validateImageUrl,
  validateCategory,
  ValidationResult,
} from "../../domain/validation/GroupValidations";
import {
  InvalidGroupNameError,
  InvalidDescriptionError,
  CategoryNotFoundError,
} from "../../domain/errors/GroupDomainErrors";

type ValidationConfig = {
  result: ValidationResult;
  error: () => Error;
};

export class GroupService implements IGroupService {
  constructor(
    private groupRepository: IGroupPersister,
    private groupStorage: IGroupStorage
  ) {}

  async createGroup(group: IBaseGroup): Promise<IGroup> {
    this.validateGroup(group);
    const response = await this.groupRepository.create(group);
    if (response.id) {
      this.groupStorage.save(response);
    }
    return response;
  }

  async updateGroup(group: IGroup): Promise<IGroup> {
    this.validateGroup(group);
    const updatedGroup = await this.groupRepository.update(group);
    this.groupStorage.save(updatedGroup);
    return updatedGroup;
  }

  async deleteGroup(id: number): Promise<void> {
    await this.groupRepository.delete(id);
    this.groupStorage.remove(id);
  }

  async getGroupById(id: number): Promise<IGroup> {
    // Primero intentamos obtener de la API
    try {
      const group = await this.groupRepository.getById(id);
      if (group) {
        this.groupStorage.save(group);
      }
      return group;
    } catch (error) {
      console.error("API error, falling back to local storage", error);
      // Fallback a localStorage si la API falla
      const localGroup = this.groupStorage.getAll().find(g => g.id === id);
      if (!localGroup) {
        throw new Error("Group not found");
      }
      return localGroup;
    }
  }

  async getGroups(): Promise<IGroup[]> {
    // Primero intentamos obtener de la API
    try {
      const groups = await this.groupRepository.getAll();
      // Si tenemos datos de la API, actualizamos el storage
      if (groups.length > 0) {
        groups.forEach((group) => this.groupStorage.save(group));
      }
      return groups;
    } catch (error) {
      console.error("API error, falling back to local storage", error);
      // Fallback a localStorage si la API falla
      return this.groupStorage.getAll();
    }
  }

  private validateGroup(group: IBaseGroup) {
    const validations: ValidationConfig[] = [
      {
        result: validateGroupName(group.name),
        error: () => new InvalidGroupNameError(group.name),
      },
      {
        result: validateDescription(group.description),
        error: () => new InvalidDescriptionError(),
      },
      {
        result: validateLocation(group.location),
        error: () => new InvalidDescriptionError(),
      },
      {
        result: validateImageUrl(group.imageUrl),
        error: () => new InvalidDescriptionError(),
      },
      {
        result: validateCategory(group.category.id),
        error: () => new CategoryNotFoundError(group.category.id),
      },
    ];

    for (const { result, error } of validations) {
      if (!result.isValid) throw error();
    }
  }
}