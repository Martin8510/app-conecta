import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroup } from "../../domain/model";

interface GroupState {
  groups: IGroup[];
  currentGroup: IGroup | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    getGroupsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getGroupsSuccess(state, action: PayloadAction<IGroup[]>) {
      state.loading = false;
      state.groups = action.payload;
    },
    getGroupsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getGroupByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    getGroupByIdSuccess(state, action: PayloadAction<IGroup>) {
      state.loading = false;
      state.currentGroup = action.payload;
    },
    getGroupByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    createGroupSuccess(state, action: PayloadAction<IGroup>) {
      state.loading = false;
      state.groups.push(action.payload);
      state.currentGroup = action.payload;
    },
    createGroupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateGroupSuccess(state, action: PayloadAction<IGroup>) {
      state.loading = false;
      state.groups = state.groups.map((group) =>
        group.id === action.payload.id ? action.payload : group
      );
      state.currentGroup = action.payload;
    },
    updateGroupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteGroupStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteGroupSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
      if (state.currentGroup?.id === action.payload) {
        state.currentGroup = null;
      }
    },
    deleteGroupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
  getGroupByIdStart,
  getGroupByIdSuccess,
  getGroupByIdFailure,
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
  updateGroupStart,
  updateGroupSuccess,
  updateGroupFailure,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
} = groupSlice.actions;

export default groupSlice.reducer;
