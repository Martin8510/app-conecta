import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import AuthErrorModal from "../components/AuthErrorModal";
import { RootState } from "../../../../app/";
import { loginFailure } from "../slices";

const LoginPage: React.FC = () => {
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();

  return (
    <div className="min-h-80 bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Iniciar sesión
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-100">
          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
            >
              Solicitar acceso
            </a>
          </div>
        </div>
      </div>

      {error && (
        <AuthErrorModal
          error={error}
          onClose={() => dispatch(loginFailure(""))}
        />
      )}
    </div>
  );
};

export default LoginPage;
