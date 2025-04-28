import React from "react";

interface AuthErrorModalProps {
  error: string | null;
  onClose: () => void;
}

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-medium text-red-600">
          Error de autenticación
        </h3>
        <p className="mt-2 text-sm text-gray-600">{error}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorModal;
