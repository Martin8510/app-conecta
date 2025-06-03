import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditGroupForm from "../components/EditGroupForm";
import GroupErrorModal from "../components/GroupErrorModal";
import { RootState } from "../../../../app/store";
import {
  updateGroupFailure,
  getGroupByIdStart,
  getGroupByIdSuccess,
  getGroupByIdFailure,
} from "../slices/GroupSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useGroupContext } from "../context/GroupContext";

const EditGroupPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getGroupById } = useGroupContext();

  const { loading, error, currentGroup } = useSelector(
    (state: RootState) => state.group
  );

  useEffect(() => {
    if (id) {
      const loadGroup = async () => {
        dispatch(getGroupByIdStart());
        try {
          const groupId = parseInt(id, 10);
          const group = await getGroupById(groupId);
          dispatch(getGroupByIdSuccess(group));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error al cargar el grupo";
          dispatch(getGroupByIdFailure(errorMessage));
        }
      };
      loadGroup();
    }
  }, [id, dispatch, getGroupById]);

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
  ];

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center">Cargando grupo...</p>
      </div>
    );
  }

  if (!currentGroup) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg text-gray-600">Grupo no encontrado</p>
          <button
            onClick={() => navigate("/groups")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Editar grupo
          </h2>
        </div>
        <EditGroupForm categories={categories} initialData={currentGroup} />
      </div>

      {error && (
        <GroupErrorModal
          error={error}
          onClose={() => dispatch(updateGroupFailure(""))}
        />
      )}
    </div>
  );
};

export default EditGroupPage;
