import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import fotologin from "../../assets/fotologin.jpg";
import BrandLogo from "../../components/brand/BrandLogo";
import ThemeToggle from "../../components/theme/ThemeToggle";
import { USER_PROFILES } from "../../constants/userProfiles";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { getPortalPath } from "../../utils/portalPath";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const { notify, setGlobalLoading } = useUI();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("aluno");
    const [error, setError] = useState("");

    /**
     * Fluxo de login atual:
     * - valida credenciais mockadas no AuthContext;
     * - cria sessão local;
     * - redireciona para a rota protegida compatível com o perfil.
     *
     * Integração JWT:
     * - manter este fluxo visual;
     * - trocar AuthContext.login por chamada real para POST /auth/login.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setGlobalLoading(true);

        window.setTimeout(() => {
            try {
                const user = login({ password: senha, role: tipoUsuario, username: usuario });
                notify(`Bem-vindo, ${user.name}.`, "success");

                const previousPath = location.state?.from?.pathname;
                const selectedPortalPath = getPortalPath(tipoUsuario);

                // Evita redirecionar um aluno para rota de professor, por exemplo.
                const destination = previousPath?.startsWith(selectedPortalPath)
                    ? previousPath
                    : selectedPortalPath;

                navigate(destination);
            } catch (caughtError) {
                setError(caughtError.message);
                notify(caughtError.message, "error");
            } finally {
                setGlobalLoading(false);
            }
        }, 500);
    };

    return (
        <div className="page-wrapper">
            <section className="login-panel">
                <div className="login-box">
                    <Link className="login-back-link" to="/">
                        <FaArrowLeft aria-hidden="true" />
                        <span>Voltar ao inicio</span>
                    </Link>
                    <ThemeToggle className="login-theme-toggle" />

                    <div className="login-brand">
                        <BrandLogo compact className="login-logo" />
                    </div>

                    <h1 className="login-title">Portal Academico</h1>
                    <p className="login-copy">
                        Acesse sua area academica para acompanhar aulas, notas,
                        atividades e servicos da faculdade.
                    </p>

                    {error && <div className="inline-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="perfil">Perfil</label>
                            <select
                                id="perfil"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            >
                                {USER_PROFILES.map((profile) => (
                                    <option key={profile.value} value={profile.value}>
                                        {profile.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="usuario">Usuario</label>
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                placeholder="Digite seu usuario"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>

                        <button type="submit">Entrar no portal</button>

                        <div className="forgot-password">
                            <a href="#">Esqueceu a senha?</a>
                        </div>
                    </form>
                </div>
            </section>

            <section className="image-panel">
                <div className="image-content">
                    <span>Nova Luz Faculdade</span>
                    <h2>Gestao academica clara, rapida e conectada.</h2>
                </div>
                <img
                    src={fotologin}
                    alt="Ambiente academico"
                    className="login-image"
                />
            </section>
        </div>
    );
}

export default Login;
