export const PASSWORD_MIN_LENGTH = 8; // Más seguro que 6
export const PASSWORD_MAX_LENGTH = 30; // Más flexible que 12
export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 20;
export const TOKEN_MIN_LENGTH = 32; // Longitud típica para tokens JWT

const PASSWORD_REGEX = {
  number: /[0-9]/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
};

const USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/; // No puede empezar/terminar con caracteres especiales

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = password.trim();

  if (trimmed.length < PASSWORD_MIN_LENGTH) {
    errors.push(
      `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`
    );
  }

  if (trimmed.length > PASSWORD_MAX_LENGTH) {
    errors.push(
      `La contraseña no puede exceder ${PASSWORD_MAX_LENGTH} caracteres`
    );
  }

  if (!PASSWORD_REGEX.number.test(trimmed)) {
    errors.push("Debe contener al menos un número");
  }

  if (!PASSWORD_REGEX.upperCase.test(trimmed)) {
    errors.push("Debe contener al menos una mayúscula");
  }

  if (!PASSWORD_REGEX.lowerCase.test(trimmed)) {
    errors.push("Debe contener al menos una minúscula");
  }

  if (!PASSWORD_REGEX.specialChar.test(trimmed)) {
    errors.push("Debe contener al menos un carácter especial");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

export function validateUsername(username: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = username.trim();

  if (trimmed.length < USERNAME_MIN_LENGTH) {
    errors.push(
      `El usuario debe tener al menos ${USERNAME_MIN_LENGTH} caracteres`
    );
  }

  if (trimmed.length > USERNAME_MAX_LENGTH) {
    errors.push(
      `El usuario no puede exceder ${USERNAME_MAX_LENGTH} caracteres`
    );
  }

  if (!USERNAME_REGEX.test(trimmed)) {
    errors.push(
      "Solo puede contener letras, números, puntos (.), guiones (-) o bajos (_) y no puede empezar/terminar con caracteres especiales"
    );
  }

  // Validación adicional para nombres de usuario comunes
  const forbiddenUsernames = ["super", "administrador"];
  if (forbiddenUsernames.includes(trimmed.toLowerCase())) {
    errors.push("Este nombre de usuario no está permitido");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

export function validateToken(token: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = token.trim();

  if (trimmed.length < TOKEN_MIN_LENGTH) {
    errors.push(`El token debe tener al menos ${TOKEN_MIN_LENGTH} caracteres`);
  }

  if (!/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/.test(trimmed)) {
    errors.push("Formato de token inválido");
  }

  try {
    const payloadBase64 = trimmed.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);

    // Validar expiración
    if (payload.exp && now >= payload.exp) {
      errors.push("El token ha expirado");
    }

    // Validar 'not before'
    if (payload.nbf && now < payload.nbf) {
      errors.push("El token aún no es válido");
    }

    // Validar issuer
    if (payload.iss !== "AUTHOJWT-BACKEND") {
      errors.push("Issuer del token no válido");
    }

    // Validar subject
    if (!payload.sub || typeof payload.sub !== "string") {
      errors.push("El token no tiene un subject válido");
    }

    // Validar authorities si quieres (opcional)
    if (!payload.authorities || typeof payload.authorities !== "string") {
      errors.push("El token no contiene authorities válidos");
    }
  } catch (e) {
    console.log(e);
    errors.push("El payload del token no se pudo decodificar");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
