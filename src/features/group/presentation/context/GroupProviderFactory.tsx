import React, { useMemo } from "react";
import { GroupProvider } from "./GroupContext";
import { GroupService } from "../../application/service/GroupService";
import { createFetchGroupRepository } from "../../infrastructure/api";
import { localStorageGroupPersister } from "../../infrastructure/storage";

export const GroupProviderWithService: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const groupService = useMemo(
    () =>
      new GroupService(
        createFetchGroupRepository(baseUrl),
        localStorageGroupPersister
      ),
    []
  );

  return <GroupProvider groupService={groupService}>{children}</GroupProvider>;
};
