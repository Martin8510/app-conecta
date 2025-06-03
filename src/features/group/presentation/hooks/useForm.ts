import { useState } from "react";
import { IBaseGroup, IValidationGroupErrors } from "../../domain/model";
import { useGroupActions } from "./useGroupActions";
import { useGroupValidation } from "./useGroupValidation";
import { useNavigate } from "react-router-dom";

const initForm: IBaseGroup = {
  name: "",
  description: "",
  location: "",
  imageUrl: "https://example.com/images/prueba.jpg",
  status: "ACTIVO",
  category: { id: 0, name: "", description: "" },
};

const initValidationErrors: IValidationGroupErrors = {
  name: [],
  description: [],
  location: [],
  imageUrl: [],
  category: [],
};

export const useForm = () => {
  const [formData, setFormData] = useState<IBaseGroup>(initForm);
  const [validationErrors, setValidationErrors] =
    useState<IValidationGroupErrors>(initValidationErrors);
  const navigate = useNavigate();

  const { validateGroup } = useGroupValidation();
  const { createGroup } = useGroupActions();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: {
          ...prev.category,
          id: parseInt(value, 10),
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setValidationErrors(initValidationErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateGroup(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      console.log("xxxxxx formData :" + formData);
      await createGroup(formData);
      navigate("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleSubmit,
  };
};
