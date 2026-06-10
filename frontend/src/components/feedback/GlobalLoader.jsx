import { useUI } from "../../hooks/useUI";

function GlobalLoader() {
  const { isGlobalLoading } = useUI();

  if (!isGlobalLoading) {
    return null;
  }

  return (
    <div className="global-loader" role="status" aria-live="polite">
      <div className="global-loader-spinner" />
      <span>Carregando...</span>
    </div>
  );
}

export default GlobalLoader;
