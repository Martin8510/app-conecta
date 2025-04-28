import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../domain/model";
import { LocalStorageAuthPersister } from "../../infrastructure";

interface AuthState {
  user: Auth | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: LocalStorageAuthPersister.getInstance().get() ?? null,
  loading: false,
  error: null,
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
      state.error = null;
      console.log("loginSuccess :" + state);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      console.log("loginFailure :" + state);
    },
    logoutSuccess(state) {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
