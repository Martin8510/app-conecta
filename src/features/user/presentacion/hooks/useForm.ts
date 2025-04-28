import { useState } from "react";
import { IBaseUser, IUserResponse, IValidationUserErrors } from "../../domain";
import { useNavigate } from "react-router-dom";
import { useUserRegister } from "./useUserRegister";
import { useUserValidation } from "./useUserValidation";

const initForm: IBaseUser = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  address: "",
  roles: [],
};

const initValidationErrors: IValidationUserErrors = {
  firstName: [],
  lastName: [],
  userName: [],
  email: [],
  password: [],
  address: [],
};

export const useForm = () => {
  const [formData, setFormData] = useState(initForm);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState("");
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] =
    useState<IValidationUserErrors>(initValidationErrors);

  const { validateUserData } = useUserValidation();
  const { register } = useUserRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors(initValidationErrors);
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateUserData(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    saveUser();
  };

  const saveUser = async () => {
    try {
      const response: IUserResponse = await register(formData);
      setFormData(initForm);
      setRegisteredUsername(response.userName);
      setShowWelcomeModal(true);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return {
    formData,
    showWelcomeModal,
    registeredUsername,
    validationErrors,
    handleChange,
    handleWelcomeModalClose,
    handleSubmit,
  };
};
