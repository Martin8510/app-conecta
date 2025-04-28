import {
  validatePassword,
  validateUsername,
} from "../../domain";

export const useAuthValidation = () => {
  const validateCredentials = (userName: string, password: string) => {
    const usernameValidation = validateUsername(userName);
    const passwordValidation = validatePassword(password);

    return {
      isValid: usernameValidation.isValid && passwordValidation.isValid,
      errors: {
        username: usernameValidation.errors,
        password: passwordValidation.errors,
      },
    };
  };

  return { validateCredentials };
};
