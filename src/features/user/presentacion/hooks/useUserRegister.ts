import { useDispatch } from "react-redux";
import { useUser } from "../context/UserContext";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../slices/UserSlice";
import { IBaseUser } from "../../domain";

export const useUserRegister = () => {
  const dispatch = useDispatch();
  const { registerUser } = useUser();

  const register = async (userData: IBaseUser) => {
    dispatch(registerStart());
    try {
      const user = await registerUser(userData);
      dispatch(registerSuccess(user));
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      dispatch(registerFailure(errorMessage));
      throw error;
    }
  };

  return { register };
};
