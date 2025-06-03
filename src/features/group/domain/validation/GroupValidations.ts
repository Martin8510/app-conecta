export const GROUP_NAME_MIN_LENGTH = 3;
export const GROUP_NAME_MAX_LENGTH = 50;
export const DESCRIPTION_MIN_LENGTH = 10;
export const DESCRIPTION_MAX_LENGTH = 500;
export const LOCATION_MIN_LENGTH = 3;
export const LOCATION_MAX_LENGTH = 100;

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export function validateGroupName(name: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = name.trim();

  if (trimmed.length < GROUP_NAME_MIN_LENGTH) {
    errors.push(
      `El nombre del grupo debe tener al menos ${GROUP_NAME_MIN_LENGTH} caracteres.`
    );
  }

  if (trimmed.length > GROUP_NAME_MAX_LENGTH) {
    errors.push(
      `El nombre del grupo no puede exceder ${GROUP_NAME_MAX_LENGTH} caracteres.`
    );
  }

  if (!/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]+$/.test(trimmed)) {
    errors.push("El nombre del grupo contiene caracteres inválidos.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateDescription(description: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = description.trim();

  if (trimmed.length < DESCRIPTION_MIN_LENGTH) {
    errors.push(
      `La descripción debe tener al menos ${DESCRIPTION_MIN_LENGTH} caracteres.`
    );
  }

  if (trimmed.length > DESCRIPTION_MAX_LENGTH) {
    errors.push(
      `La descripción no puede exceder ${DESCRIPTION_MAX_LENGTH} caracteres.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateLocation(location: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = location.trim();

  if (trimmed.length < LOCATION_MIN_LENGTH) {
    errors.push(
      `La ubicación debe tener al menos ${LOCATION_MIN_LENGTH} caracteres.`
    );
  }

  if (trimmed.length > LOCATION_MAX_LENGTH) {
    errors.push(
      `La ubicación no puede exceder ${LOCATION_MAX_LENGTH} caracteres.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateImageUrl(url: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = url.trim();

  if (trimmed.length === 0) {
    return { isValid: true }; // Optional field
  }

  try {
    new URL(trimmed);
  } catch {
    errors.push("La URL de la imagen no es válida.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateCategory(categoryId: number): ValidationResult {
  const errors: string[] = [];

  if (!categoryId || categoryId <= 0) {
    errors.push("Debe seleccionar una categoría válida.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}
