import React, { createContext, useContext, ReactNode } from "react";
import { IGroupService } from "../../application/input";
import { IBaseGroup, IGroup } from "../../domain/model";

interface GroupContextType {
  createGroup: (group: IBaseGroup) => Promise<IGroup>;
  updateGroup: (group: IGroup) => Promise<IGroup>;
  deleteGroup: (id: number) => Promise<void>;
  getGroupById: (id: number) => Promise<IGroup>;
  getGroups: () => Promise<IGroup[]>;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
  groupService: IGroupService;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({
  children,
  groupService,
}) => {
  const createGroup = async (group: IBaseGroup) => {
    return await groupService.createGroup(group);
  };

  const updateGroup = async (group: IGroup) => {
    return await groupService.updateGroup(group);
  };

  const deleteGroup = async (id: number) => {
    return await groupService.deleteGroup(id);
  };

  const getGroupById = async (id: number) => {
    return await groupService.getGroupById(id);
  };

  const getGroups = async () => {
    return await groupService.getGroups();
  };

  const value = {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupById,
    getGroups,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroupContext must be used within a GroupProvider");
  }
  return context;
};
