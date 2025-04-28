import { useState } from "react";
import { IValidationAuthErrors } from "../../domain";
import { useAuthValidation } from "./useAuthValidation";
import { useAuthUser } from "./";
import { useNavigate } from "react-router-dom";

const initValidationErrors: IValidationAuthErrors = {
  username: [],
  password: [],
};

export const useForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] =
    useState<IValidationAuthErrors>(initValidationErrors);

  const { validateCredentials } = useAuthValidation();
  const { login } = useAuthUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "userName") setUserName(value);
    if (name == "password") setPassword(value);
    setValidationErrors(initValidationErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCredentials(userName, password);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    signIn();
  };

  const signIn = async () => {
    try {
      await login({ userName, password });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    userName,
    password,
    validationErrors,
    handleChange,
    handleSubmit,
  };
};
