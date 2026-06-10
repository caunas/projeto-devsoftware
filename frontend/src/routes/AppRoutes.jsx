import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Forbidden from "../pages/errors/Forbidden";
import NotFound from "../pages/errors/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { portalRoutes } from "./routeConfig";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas: não exigem autenticação nem JWT. */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/403" element={<Forbidden />} />

        {/* Cada grupo abaixo é protegido por role antes de renderizar o layout. */}
        {portalRoutes.map(({ children, layout: Layout, path, role }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute role={role}>
                <Layout />
              </ProtectedRoute>
            }
          >
            {children.map(({ element: Page, index, path: childPath }) => (
              <Route
                key={childPath || "index"}
                index={index}
                path={childPath}
                element={<Page />}
              />
            ))}
          </Route>
        ))}

        {/* Fallback global para URLs inexistentes. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
