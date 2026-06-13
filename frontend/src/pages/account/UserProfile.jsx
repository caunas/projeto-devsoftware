import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";

function UserProfile() {
  const { updateProfile, user } = useAuth();
  const { notify } = useUI();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile({ email, name });
    notify("Perfil atualizado com sucesso.", "success");
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
            <input id="profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <button type="submit">Salvar perfil</button>
        </form>
      </article>
    </section>
  );
}

export default UserProfile;
