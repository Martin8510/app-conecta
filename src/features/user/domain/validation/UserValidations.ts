export const FIRSTNAME_MIN_LENGTH = 3;
export const FIRSTNAME_MAX_LENGTH = 15;
export const LASTNAME_MIN_LENGTH = 3;
export const LASTNAME_MAX_LENGTH = 30; // Apellidos pueden ser más largos
export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 10;
export const ADDRESS_MIN_LENGTH = 5;
export const ADDRESS_MAX_LENGTH = 15;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 30;

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

// Caracteres permitidos para nombres (incluye acentos y caracteres internacionales)
const NAME_REGEX = /^[\p{L}\s'-]+$/u;
const ADDRESS_REGEX = /^[\p{L}0-9\s#.,'-]+$/u;

export function validateFirstName(firstName: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = firstName.trim();
  if (trimmed.length < FIRSTNAME_MIN_LENGTH) {
    errors.push(
      `El nombre debe tener al menos ${FIRSTNAME_MIN_LENGTH} caracteres.`
    );
  }
  if (trimmed.length > FIRSTNAME_MAX_LENGTH) {
    errors.push(
      `El nombre no puede exceder ${FIRSTNAME_MAX_LENGTH} caracteres.`
    );
  }

  if (!NAME_REGEX.test(trimmed)) {
    errors.push("El nombre contiene caracteres inválidos.");
  }
  if (!/^[A-ZÁÉÍÓÚÜÑ]/.test(trimmed)) {
    errors.push("El nombre debe comenzar con una letra mayúscula.");
  }
  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateLastName(lastName: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = lastName.trim();

  if (trimmed.length < LASTNAME_MIN_LENGTH) {
    errors.push(
      `El apellido debe tener al menos ${LASTNAME_MIN_LENGTH} caracteres.`
    );
  }
  if (trimmed.length > LASTNAME_MAX_LENGTH) {
    errors.push(
      `El apellido no puede exceder ${LASTNAME_MAX_LENGTH} caracteres.`
    );
  }
  if (!NAME_REGEX.test(trimmed)) {
    errors.push("El apellido contiene caracteres inválidos.");
  }
  const parts = trimmed.split(/\s+/);
  parts.forEach((part) => {
    if (!/^[A-ZÁÉÍÓÚÜÑ]/.test(part)) {
      errors.push(
        `Cada parte del apellido debe comenzar con una letra mayúscula: "${part}".`
      );
    }
  });
  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateUserName(userName: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = userName.trim();
  if (trimmed.length < USERNAME_MIN_LENGTH) {
    errors.push(
      `El nombre de usuario debe tener al menos ${USERNAME_MIN_LENGTH} caracteres.`
    );
  }
  if (trimmed.length > USERNAME_MAX_LENGTH) {
    errors.push(
      `El nombre de usuario no puede exceder ${USERNAME_MAX_LENGTH} caracteres.`
    );
  }
  if (!/^[a-z0-9_]+$/.test(trimmed)) {
    errors.push(
      "El nombre de usuario solo puede contener letras minúsculas, números y guiones bajos."
    );
  }
  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = email.trim();
  if (trimmed.length > 254) {
    errors.push("El correo electrónico no puede tener más de 254 caracteres.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    errors.push("Formato de correo electrónico inválido.");
  }
  if (trimmed.endsWith(".")) {
    errors.push("El correo no debe terminar con punto.");
  }
  if (/\.\./.test(trimmed)) {
    errors.push("El correo no debe contener dos puntos seguidos.");
  }
  const domain = trimmed.split("@")[1];
  if (!domain || !domain.includes(".")) {
    errors.push("El dominio del correo no es válido.");
  }
  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = password.trim();
  if (trimmed.length < PASSWORD_MIN_LENGTH) {
    errors.push(
      `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`
    );
  }
  if (trimmed.length > PASSWORD_MAX_LENGTH) {
    errors.push(
      `La contraseña no puede exceder ${PASSWORD_MAX_LENGTH} caracteres.`
    );
  }
  if (!/[A-Z]/.test(trimmed)) {
    errors.push("Debe contener al menos una letra mayúscula.");
  }
  if (!/[0-9]/.test(trimmed)) {
    errors.push("Debe contener al menos un número.");
  }
  if (!/[^A-Za-z0-9]/.test(trimmed)) {
    errors.push("Debe contener al menos un carácter especial.");
  }
  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function validateAddress(address: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = address.trim();
  if (trimmed.length < ADDRESS_MIN_LENGTH) {
    errors.push(
      `La dirección debe tener al menos ${ADDRESS_MIN_LENGTH} caracteres.`
    );
  }
  if (trimmed.length > ADDRESS_MAX_LENGTH) {
    errors.push(
      `La dirección no puede exceder ${ADDRESS_MAX_LENGTH} caracteres.`
    );
  }
  if (!ADDRESS_REGEX.test(trimmed)) {
    errors.push("La dirección contiene caracteres inválidos.");
  }
  return {
    isValid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}
