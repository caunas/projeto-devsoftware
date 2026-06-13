import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getPortalPath } from "../../utils/portalPath";

function Forbidden() {
  const { user } = useAuth();
  const homePath = user ? getPortalPath(user.role) : "/login";

  return (
    <main className="error-page">
      <span>403</span>
      <h1>Acesso negado</h1>
      <p>Seu perfil nao possui permissao para acessar esta area.</p>
      <Link to={homePath}>Voltar para minha area</Link>
    </main>
  );
}

export default Forbidden;
