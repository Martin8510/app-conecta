import { Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import { HomePage } from "../pages";
import { DashboardPage } from "../pages";
import { LoginPage } from "../features/auth/presentacion";
import { RegisterPage } from "../features/user/presentacion";
import { ProtectedRoute } from "../components";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
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
