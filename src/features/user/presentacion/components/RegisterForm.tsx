import React from "react";
import WelcomeModal from "./WelcomeModal";
import { useForm } from "../hooks";

const RegisterForm: React.FC = () => {
  const {
    formData,
    showWelcomeModal,
    registeredUsername,
    validationErrors,
    handleChange,
    handleWelcomeModalClose,
    handleSubmit,
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-md border ${
                  validationErrors.firstName
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                } transition duration-200`}
                aria-invalid={!!validationErrors.firstName}
                aria-describedby={
                  validationErrors.firstName ? "firstName-error" : undefined
                }
              />
            </div>
            {validationErrors.firstName && (
              <p className="mt-2 text-sm text-red-600" id="firstName-error">
                {validationErrors.firstName.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-md border ${
                  validationErrors.lastName
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                } transition duration-200`}
                aria-invalid={!!validationErrors.lastName}
                aria-describedby={
                  validationErrors.lastName ? "lastName-error" : undefined
                }
              />
            </div>
            {validationErrors.lastName && (
              <p className="mt-2 text-sm text-red-600" id="lastName-error">
                {validationErrors.lastName.join(", ")}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de usuario
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">@</span>
            </div>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              className={`block w-full pl-7 px-4 py-3 rounded-md border ${
                validationErrors.userName
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              } transition duration-200`}
              aria-invalid={!!validationErrors.userName}
              aria-describedby={
                validationErrors.userName ? "userName-error" : undefined
              }
            />
          </div>
          {validationErrors.userName && (
            <p className="mt-2 text-sm text-red-600" id="userName-error">
              {validationErrors.userName.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full pl-10 px-4 py-3 rounded-md border ${
                validationErrors.email
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              } transition duration-200`}
              aria-invalid={!!validationErrors.email}
              aria-describedby={
                validationErrors.email ? "email-error" : undefined
              }
            />
          </div>
          {validationErrors.email && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {validationErrors.email.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full pl-10 px-4 py-3 rounded-md border ${
                validationErrors.password
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              } transition duration-200`}
              aria-invalid={!!validationErrors.password}
              aria-describedby={
                validationErrors.password ? "password-error" : undefined
              }
            />
          </div>
          {validationErrors.password && (
            <p className="mt-2 text-sm text-red-600" id="password-error">
              {validationErrors.password.join(", ")}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            La contraseña debe tener al menos 8 caracteres, incluyendo
            mayúsculas, minúsculas y números.
          </p>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`block w-full px-4 py-3 rounded-md border ${
                validationErrors.address
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              } transition duration-200`}
              aria-invalid={!!validationErrors.address}
              aria-describedby={
                validationErrors.address ? "address-error" : undefined
              }
            />
          </div>
          {validationErrors.address && (
            <p className="mt-2 text-sm text-red-600" id="address-error">
              {validationErrors.address.join(", ")}
            </p>
          )}
        </div>

        {/*         <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Acepto los{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Términos y Condiciones
            </a>{" "}
            y la{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Política de Privacidad
            </a>
          </label>
        </div> */}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Registrarse
          </button>
        </div>
      </form>

      {showWelcomeModal && (
        <WelcomeModal
          username={registeredUsername}
          onClose={handleWelcomeModalClose}
        />
      )}
    </>
  );
};

export default RegisterForm;
