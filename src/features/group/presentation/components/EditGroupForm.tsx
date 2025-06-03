import React, { useState, useEffect } from "react";
import { ICategory, IGroup } from "../../domain/model";
import { useNavigate } from "react-router-dom";
import { useGroupActions } from "../hooks/useGroupActions";

interface EditGroupFormProps {
  categories: ICategory[];
  initialData: IGroup;
}

const EditGroupForm: React.FC<EditGroupFormProps> = ({
  categories,
  initialData,
}) => {
  const navigate = useNavigate();
  const { updateGroup } = useGroupActions();

  const [formData, setFormData] = useState<IGroup>(initialData);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string[];
    description?: string[];
    location?: string[];
    imageUrl?: string[];
    category?: string[];
  }>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find(
        (c) => c.id === parseInt(value, 10)
      );
      if (selectedCategory) {
        setFormData((prev) => ({
          ...prev,
          category: selectedCategory,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateGroup = () => {
    const errors: typeof validationErrors = {};
    let isValid = true;

    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = ["El nombre debe tener al menos 3 caracteres"];
      isValid = false;
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = ["La descripción debe tener al menos 10 caracteres"];
      isValid = false;
    }

    if (!formData.location || formData.location.trim().length < 3) {
      errors.location = ["La ubicación debe tener al menos 3 caracteres"];
      isValid = false;
    }

    if (!formData.category || formData.category.id <= 0) {
      errors.category = ["Debe seleccionar una categoría válida"];
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateGroup()) {
      return;
    }

    try {
      await updateGroup(formData);
      navigate("/groups");
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre del grupo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {validationErrors.name && (
          <div className="text-red-500 text-xs mt-1">
            {validationErrors.name.join(", ")}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />
        {validationErrors.description && (
          <div className="text-red-500 text-xs mt-1">
            {validationErrors.description.join(", ")}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Ubicación
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {validationErrors.location && (
          <div className="text-red-500 text-xs mt-1">
            {validationErrors.location.join(", ")}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Categoría
        </label>
        <select
          id="category"
          name="category"
          value={formData.category?.id || ""}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {validationErrors.category && (
          <div className="text-red-500 text-xs mt-1">
            {validationErrors.category.join(", ")}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/groups")}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Actualizar Grupo
        </button>
      </div>
    </form>
  );
};

export default EditGroupForm;
