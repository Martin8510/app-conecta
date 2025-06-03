import { useDispatch } from "react-redux";
import { useGroupContext } from "../context/GroupContext";
import {
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
  updateGroupStart,
  updateGroupSuccess,
  updateGroupFailure,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
  getGroupByIdStart,
  getGroupByIdSuccess,
  getGroupByIdFailure,
} from "../slices/GroupSlice";
import { IBaseGroup, IGroup } from "../../domain";

export const useGroupActions = () => {
  const dispatch = useDispatch();
  const {
    createGroup: createGroupService,
    updateGroup: updateGroupService,
    deleteGroup: deleteGroupService,
    getGroupById: getGroupByIdService,
  } = useGroupContext();

  const createGroup = async (groupData: IBaseGroup) => {
    dispatch(createGroupStart());
    try {
      const group = await createGroupService(groupData);
      dispatch(createGroupSuccess(group));
      return group;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      dispatch(createGroupFailure(errorMessage));
      throw error;
    }
  };

  const updateGroup = async (groupData: IGroup) => {
    dispatch(updateGroupStart());
    try {
      const group = await updateGroupService(groupData);
      dispatch(updateGroupSuccess(group));
      return group;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      dispatch(updateGroupFailure(errorMessage));
      throw error;
    }
  };

  const deleteGroup = async (id: number) => {
    dispatch(deleteGroupStart());
    try {
      await deleteGroupService(id);
      dispatch(deleteGroupSuccess(id));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      dispatch(deleteGroupFailure(errorMessage));
      throw error;
    }
  };

  const getGroupById = async (id: number) => {
    dispatch(getGroupByIdStart());
    try {
      const group = await getGroupByIdService(id);
      dispatch(getGroupByIdSuccess(group));
      return group;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      dispatch(getGroupByIdFailure(errorMessage));
      throw error;
    }
  };

  return {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupById,
  };
};
