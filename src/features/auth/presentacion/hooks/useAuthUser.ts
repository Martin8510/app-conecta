import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from "../slices";
import { useAuthContext } from "../context/AuthContext";
import { BaseAuth } from "../../domain";

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const { signIn, signOut } = useAuthContext();

  const login = async (user: BaseAuth) => {
    try {
      dispatch(loginStart());
      const authData = await signIn(user);
      dispatch(loginSuccess(authData));
    } catch (error) {
      let errorMessage = "Error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  };

  const logout = async () => {
    await signOut();
    dispatch(logoutSuccess());
  };

  return { login, logout };
};
