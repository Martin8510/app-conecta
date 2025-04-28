import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RegisterForm from "../components/RegisterForm";
import RegisterErrorModal from "../components/RegisterErrorModal";
import { RootState } from "../../../../app/";
import { registerFailure } from "../slices/UserSlice";

const RegisterPage: React.FC = () => {
  const error = useSelector((state: RootState) => state.user.error);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-stone-50 from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Sección ilustrativa */}
          <div className="hidden md:block md:w-1/2 bg-rose-400 to-indigo-700 p-10 text-white">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Únete a nuestra comunidad
                </h2>
                <p className="opacity-90 mb-6">
                  Accede a contenido exclusivo, conecta con otros usuarios y
                  disfruta de una experiencia personalizada.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Acceso inmediato</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Contenido exclusivo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Soporte prioritario</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Crear cuenta
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Inicia sesión
                </a>
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>

      {error && (
        <RegisterErrorModal
          error={error}
          onClose={() => dispatch(registerFailure(""))}
        />
      )}
    </div>
  );
};

export default RegisterPage;
