import { Navigate, useLocation } from "react-router-dom";
import SkeletonPage from "../components/feedback/SkeletonPage";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const { isAuthenticated, isInitializing, user } = useAuth();

  // Enquanto a sessão JWT for validada no backend, exibimos skeleton.
  if (isInitializing) {
    return <SkeletonPage />;
  }

  // Usuário sem sessão é enviado ao login preservando a rota desejada.
  if (!isAuthenticated) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  // Usuário autenticado com role errada recebe 403 no frontend.
  // O backend deve repetir essa validação em todos os endpoints protegidos.
  if (role && user.role !== role) {
    return <Navigate replace to="/403" />;
  }

  return children;
}

export default ProtectedRoute;
