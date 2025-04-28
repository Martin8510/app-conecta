import React from "react";
import { useForm } from "../hooks";

const LoginForm: React.FC = () => {
  const { userName, password, validationErrors, handleChange, handleSubmit } =
    useForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Nombre de usuario
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            id="userName"
            name="userName"
            type="text"
            value={userName}
            onChange={handleChange}
            autoComplete="username"
            aria-describedby="username-error"
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 placeholder-gray-400"
            placeholder="Ingresa tu usuario"
          />
        </div>
        {validationErrors.username && (
          <div
            id="username-error"
            className="mt-1.5 text-sm text-red-600 flex items-start"
          >
            <svg
              className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{validationErrors.username.join(", ")}</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <a
            href="/forgot-password"
            className="text-xs font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
          >
            Recuperar contraseña
          </a>
        </div>
        <div className="relative rounded-md shadow-sm">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            autoComplete="current-password"
            aria-describedby="password-error"
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>
        {validationErrors.password && (
          <div
            id="password-error"
            className="mt-1.5 text-sm text-red-600 flex items-start"
          >
            <svg
              className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{validationErrors.password.join(", ")}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Recordar mi usuario
          </label>
        </div>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
        >
          Acceder al sistema
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
