import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContextValue";

const STORAGE_KEY = "portal-auth-user";

/**
 * Versão da sessão mockada.
 *
 * Ela invalida sessões antigas salvas no localStorage. Na integração JWT,
 * remova esta constante e valide sessão usando /auth/me ou refresh token.
 */
const AUTH_SESSION_VERSION = "mock-auth-v1";

/**
 * Credenciais fictícias usadas somente durante o desenvolvimento.
 *
 * Integração backend:
 * - remover este objeto;
 * - enviar username/password/role para POST /auth/login;
 * - salvar accessToken, refreshToken e user retornados pela API.
 */
const MOCK_CREDENTIALS = {
  password: "Asdas",
  username: "Asdas",
};

const roleNames = {
  aluno: "Aluno",
  professor: "Professor",
  coordenador: "Coordenador",
};

export function AuthProvider({ children }) {
  /**
   * Estado do usuário autenticado.
   *
   * Hoje vem do localStorage para simular persistência.
   * Com JWT, carregue tokens e valide o usuário em /auth/me antes
   * de liberar as rotas protegidas.
   */
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.sessionVersion !== AUTH_SESSION_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return parsedUser;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  /**
   * No mock a inicialização é síncrona.
   * Na API real, altere para useState(true) e finalize como false
   * somente após validar token, refresh token ou ausência de sessão.
   */
  const isInitializing = false;

  /**
   * Realiza login fictício.
   *
   * Contrato futuro:
   * const { accessToken, refreshToken, user } = await authService.login(...)
   */
  const login = useCallback(({ password, role, username }) => {
    if (username !== MOCK_CREDENTIALS.username || password !== MOCK_CREDENTIALS.password) {
      throw new Error("Usuario ou senha invalidos.");
    }

    const nextUser = {
      email: `${username || role}@novaluz.edu.br`,
      id: `${role}-2026`,
      name: username || roleNames[role],
      role,
      sessionVersion: AUTH_SESSION_VERSION,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  /**
   * Encerra a sessão local.
   *
   * Com backend real, chame POST /auth/logout antes de limpar os tokens locais.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  /**
   * Atualiza dados básicos do usuário no mock.
   *
   * Com backend real, substitua por PATCH /users/me e use a resposta da API
   * para atualizar o estado local.
   */
  const updateProfile = useCallback((data) => {
    const nextUser = { ...user, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, [user]);

  /**
   * Simula alteração de senha.
   *
   * Com backend real, substitua por PATCH /users/me/password.
   */
  const changePassword = useCallback(({ currentPassword, newPassword }) => {
    if (!currentPassword || !newPassword) {
      throw new Error("Preencha a senha atual e a nova senha.");
    }

    if (newPassword.length < 6) {
      throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
    }

    return true;
  }, []);

  const value = useMemo(
    () => ({
      changePassword,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      logout,
      updateProfile,
      user,
    }),
    [changePassword, isInitializing, login, logout, updateProfile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
