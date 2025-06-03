import { Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import { HomePage } from "../pages";
import { DashboardPage } from "../pages";
import { LoginPage } from "../features/auth/presentacion";
import { RegisterPage } from "../features/user/presentacion";
import { ProtectedRoute } from "../components";
import {
  CreateGroupPage,
  GroupListPage,
  EditGroupPage,
} from "../features/group/presentation";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="groups" element={<GroupListPage />} />
        <Route path="groups/create" element={<CreateGroupPage />} />
        <Route path="groups/edit/:id" element={<EditGroupPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
