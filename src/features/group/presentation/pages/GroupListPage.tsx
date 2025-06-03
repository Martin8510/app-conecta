// features/group/presentation/pages/GroupListPage.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";
import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
} from "../slices/GroupSlice";
import { useGroupContext } from "../context/GroupContext";
import { Link, useNavigate } from "react-router-dom";
import GroupErrorModal from "../components/GroupErrorModal";
import { ConfirmationModal } from "../components";

const GroupListPage: React.FC = () => {
  const { groups, loading, error } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getGroups, deleteGroup } = useGroupContext();
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDeleteClick = (groupId: number) => {
    setGroupToDelete(groupId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!groupToDelete) return;

    try {
      dispatch(deleteGroupStart());
      await deleteGroup(groupToDelete);
      dispatch(deleteGroupSuccess(groupToDelete));
      // Recargar la lista después de eliminar
      const updatedGroups = await getGroups();
      dispatch(getGroupsSuccess(updatedGroups));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al eliminar grupo";
      dispatch(deleteGroupFailure(errorMessage));
    } finally {
      setShowDeleteModal(false);
      setGroupToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setGroupToDelete(null);
  };

  if (loading && groups.length === 0) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p>Cargando grupos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-red-500">{error}</div>
      </div>
    );
  }

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
                  onClick={() => handleDeleteClick(group.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {showDeleteModal && (
          <ConfirmationModal
            title="Confirmar eliminación"
            message="¿Estás seguro de que deseas eliminar este grupo?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        {error && (
          <GroupErrorModal
            error={error}
            onClose={() => dispatch(deleteGroupFailure(""))}
          />
        )}
      </div>
    </div>
  );
};

export default GroupListPage;
