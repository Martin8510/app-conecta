import {
  validateGroupName,
  validateDescription,
  validateLocation,
  validateImageUrl,
  validateCategory,
} from "../../domain/validation/GroupValidations";

export const useGroupValidation = () => {
  const validateGroup = (group: {
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    category: { id: number };
  }) => {
    const validations = {
      name: validateGroupName(group.name),
      description: validateDescription(group.description),
      location: validateLocation(group.location),
      imageUrl: validateImageUrl(group.imageUrl),
      category: validateCategory(group.category.id),
    };

    return {
      isValid: Object.values(validations).every((v) => v.isValid),
      errors: {
        name: validations.name.errors,
        description: validations.description.errors,
        location: validations.location.errors,
        imageUrl: validations.imageUrl.errors,
        category: validations.category.errors,
      },
    };
  };

  return { validateGroup };
};
