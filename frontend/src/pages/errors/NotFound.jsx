import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="error-page">
      <span>404</span>
      <h1>Pagina nao encontrada</h1>
      <p>O endereco acessado nao existe ou foi movido.</p>
      <Link to="/">Voltar ao inicio</Link>
    </main>
  );
}

export default NotFound;
