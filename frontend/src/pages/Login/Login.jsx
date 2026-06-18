import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Futuramente:
        // chamar backend JWT

        navigate("/aluno");
    };

    return (
        <div className="page-wrapper">
            <div className="login-panel">
                <div className="login-box">
                    <h1>Login</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="usuario">
                                Usuário:
                            </label>

                            <input
                                type="text"
                                id="usuario"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Senha:
                            </label>

                            <input
                                type="password"
                                id="password"
                                required
                            />
                        </div>

                        <button type="submit">
                            Entrar
                        </button>

                        <div className="forgot-password">
                            <a href="#">
                                Esqueceu a senha?
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="image-panel">
                {/* 
                <div className="image-placeholder">
                    <span>Imagem grande aqui</span>
                </div>
                */}
                <div className="image-portal">
                </div>
            </div>
        </div>
    );
}

export default Login;
