// group/presentation/pages/CreateGroupPage.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupForm from "../components/GroupForm";
import GroupErrorModal from "../components/GroupErrorModal";
import { RootState } from "../../../../app/store";
import { createGroupFailure } from "../slices/GroupSlice";

const CreateGroupPage: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch();
  // Aquí deberías cargar las categorías disponibles, quizás desde un hook o contexto

  const categories = [
    {
      id: 1,
      name: "Deportes",
      description: "Actividades deportivas y fitness",
    },
    {
      id: 2,
      name: "Gastronomía",
      description: "Arte culinario y cultura gastronómica",
    },
    {
      id: 3,
      name: "Educación",
      description: "Cursos, talleres y formación académica",
    },
  ]; // Esto es temporal, deberías obtenerlo de tu backend
  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear nuevo grupo
          </h2>
        </div>
        <GroupForm categories={categories} />
        {loading && <p>Creando grupo...</p>}
      </div>

      {error && (
        <GroupErrorModal
          error={error}
          onClose={() => dispatch(createGroupFailure(""))}
        />
      )}
    </div>
  );
};

export default CreateGroupPage;
