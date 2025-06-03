import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";
import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "../slices/GroupSlice";
import { useGroupContext } from "../context/GroupContext";
import { Link, useNavigate } from "react-router-dom";

const GroupListPage: React.FC = () => {
  const { groups, loading, error } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getGroups, deleteGroup } = useGroupContext();

  useEffect(() => {
    const loadGroups = async () => {
      dispatch(getGroupsStart());
      try {
        const groups = await getGroups();
        dispatch(getGroupsSuccess(groups));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al cargar grupos";
        dispatch(getGroupsFailure(errorMessage));
      }
    };

    loadGroups();
  }, [dispatch, getGroups]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este grupo?")) {
      try {
        await deleteGroup(id);
      } catch (error) {
        console.error("Error deleting group:", error);
      }
    }
  };

  if (loading) return <div>Cargando grupos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Lista de Grupos</h1>
          <Link
            to="/groups/create"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Crear Nuevo Grupo
          </Link>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                {group.name}
              </h3>
              <p className="mt-2 text-gray-600">{group.description}</p>
              <p className="mt-2 text-sm text-gray-500">{group.location}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => navigate(`/groups/edit/${group.id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(group.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupListPage;
