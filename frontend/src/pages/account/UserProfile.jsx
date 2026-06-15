import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { getApiErrorMessage } from "../../services/api";
import { portalApi } from "../../services/portalService";

function UserProfile() {
  const { updateProfile, user } = useAuth();
  const { notify } = useUI();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    portalApi.me().then((profile) => {
      setName(profile.nome);
      setEmail(profile.email);
    }).catch((error) => notify(getApiErrorMessage(error, "Nao foi possivel carregar o perfil."), "error"));
  }, [notify]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ name });
      notify("Perfil atualizado com sucesso.", "success");
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel atualizar o perfil."), "error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="portal-page">
      <header className="page-hero">
        <div>
          <div className="page-eyebrow">Conta</div>
          <h1>Perfil do usuario</h1>
          <p>Atualize os dados principais da conta logada no portal.</p>
        </div>
        <div className="hero-badge">{user?.role}</div>
      </header>

      <article className="account-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profile-name">Nome</label>
            <input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="profile-email">E-mail</label>
            <input id="profile-email" type="email" value={email} readOnly />
          </div>
          <button type="submit" disabled={isSaving}>{isSaving ? "Salvando..." : "Salvar perfil"}</button>
        </form>
      </article>
    </section>
  );
}

export default UserProfile;
