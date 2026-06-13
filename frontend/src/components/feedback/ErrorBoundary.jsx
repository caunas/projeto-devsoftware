import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <span>Erro inesperado</span>
          <h1>Algo saiu do fluxo esperado.</h1>
          <p>Atualize a pagina ou volte para o inicio para continuar navegando.</p>
          <a href="/">Voltar ao inicio</a>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
