import {
  validateAddress,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateUserName,
} from "../../domain/validation/UserValidations";

export const useUserValidation = () => {
  const validateUserData = (userData: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    address: string;
  }) => {
    const validations = {
      firstName: validateFirstName(userData.firstName),
      lastName: validateLastName(userData.lastName),
      userName: validateUserName(userData.userName),
      email: validateEmail(userData.email),
      password: validatePassword(userData.password),
      address: validateAddress(userData.address),
    };

    return {
      isValid: Object.values(validations).every((v) => v.isValid),
      errors: {
        firstName: validations.firstName.errors,
        lastName: validations.lastName.errors,
        userName: validations.userName.errors,
        email: validations.email.errors,
        password: validations.password.errors,
        address: validations.address.errors,
      },
    };
  };

  return { validateUserData };
};
