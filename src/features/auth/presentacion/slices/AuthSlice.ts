import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../domain/model";
import { LocalStorageAuthPersister } from "../../infrastructure";

interface AuthState {
  user: Auth | null;
  loading: boolean;
  error: string | null;
  userId: number | null;
  memberId: number | null;
  ownerId: number | null;
  adminId: number | null;
}

const initialState: AuthState = {
  user: LocalStorageAuthPersister.getInstance().get() ?? null,
  loading: false,
  error: null,
  userId: LocalStorageAuthPersister.getInstance().get()?.idUser || null,
  memberId: LocalStorageAuthPersister.getInstance().get()?.idMember || null,
  ownerId: LocalStorageAuthPersister.getInstance().get()?.idOwner || null,
  adminId: LocalStorageAuthPersister.getInstance().get()?.idAdmin || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      console.log("loginStart :" + state);
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<Auth>) {
      state.loading = false;
      state.user = action.payload;
      state.userId = action.payload.idUser;
      state.memberId = action.payload.idMember;
      state.ownerId = action.payload.idOwner;
      state.adminId = action.payload.idAdmin;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      console.log("loginFailure :" + state);
    },
    logoutSuccess(state) {
      state.user = null;
      state.userId = null;
      state.memberId = null;
      state.ownerId = null;
      state.adminId = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
