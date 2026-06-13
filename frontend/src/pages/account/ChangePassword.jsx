import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";

function ChangePassword() {
  const { changePassword } = useAuth();
  const { notify } = useUI();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (newPassword !== confirmation) {
        throw new Error("A confirmacao precisa ser igual a nova senha.");
      }

      changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmation("");
      notify("Senha alterada com sucesso.", "success");
    } catch (caughtError) {
      setError(caughtError.message);
      notify(caughtError.message, "error");
    }
  }

  return (
    <section className="portal-page">
      <header className="page-hero">
        <div>
          <div className="page-eyebrow">Seguranca</div>
          <h1>Alteracao de senha</h1>
          <p>Defina uma nova senha para manter o acesso ao portal protegido.</p>
        </div>
        <div className="hero-badge">Conta segura</div>
      </header>

      <article className="account-card">
        {error && <div className="inline-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current-password">Senha atual</label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Nova senha</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar nova senha</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
            />
          </div>
          <button type="submit">Alterar senha</button>
        </form>
      </article>
    </section>
  );
}

export default ChangePassword;
