import { useCallback, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "./AuthContextValue";
import { loginRequest } from "../../services/authService";
import { TOKEN_STORAGE_KEY } from "../../services/api";

const USER_STORAGE_KEY = "portal-auth-user";

/**
 * Normaliza as roles do backend para o formato esperado pelo frontend.
 *
 * Backend:
 * - ROLE_ALUNO
 * - ROLE_PROFESSOR
 * - ROLE_COORDENADOR
 *
 * Frontend:
 * - aluno
 * - professor
 * - coordenador
 */
function normalizeRole(role) {
  switch (role) {
    case "ROLE_ALUNO":
      return "aluno";

    case "ROLE_PROFESSOR":
      return "professor";

    case "ROLE_COORDENADOR":
      return "coordenador";

    case "ALUNO":
      return "aluno";

    case "PROFESSOR":
      return "professor";

    case "COORDENADOR":
      return "coordenador";

    default:
      return null;
  }
}

export function AuthProvider({ children }) {
  /**
   * Estado do usuário autenticado.
   *
   * Na integração JWT, os dados básicos do usuário são
   * restaurados do localStorage para manter a sessão.
   */
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  });

  /**
   * Atualmente a inicialização é síncrona.
   *
   * Caso futuramente exista refresh token ou endpoint
   * de validação de sessão, altere para um fluxo assíncrono.
   */
  const isInitializing = false;

  /**
   * Realiza login utilizando o backend.
   *
   * Fluxo:
   * - envia email e senha
   * - recebe JWT
   * - decodifica claims
   * - monta objeto user
   * - persiste token e usuário
   */
  const login = useCallback(async ({ expectedRole, username, password }) => {
    const response = await loginRequest(username, password);

    const token = response.acessToken;

    const payload = jwtDecode(token);
    const role = normalizeRole(payload.role);

    if (!role) {
      throw new Error("Perfil de usuario nao reconhecido pela aplicacao.");
    }

    if (expectedRole && role !== expectedRole) {
      throw new Error("O perfil selecionado nao corresponde ao usuario informado.");
    }

    const nextUser = {
      id: payload.id,
      name: payload.nome,
      email: payload.sub,
      role,
    };

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));

    setUser(nextUser);

    return nextUser;
  }, []);

  /**
   * Encerra a sessão local.
   *
   * Caso exista logout no backend futuramente,
   * chamar o endpoint antes de limpar os dados locais.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    setUser(null);
  }, []);

  /**
   * Atualiza dados básicos do usuário localmente.
   *
   * Futuramente substituir por PATCH /users/me.
   */
  const updateProfile = useCallback(
    (data) => {
      const nextUser = { ...user, ...data };

      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(nextUser)
      );

      setUser(nextUser);

      return nextUser;
    },
    [user]
  );

  /**
   * Simula alteração de senha.
   *
   * Futuramente substituir por PATCH /users/me/password.
   */
  const changePassword = useCallback(
    ({ currentPassword, newPassword }) => {
      if (!currentPassword || !newPassword) {
        throw new Error(
          "Preencha a senha atual e a nova senha."
        );
      }

      if (newPassword.length < 6) {
        throw new Error(
          "A nova senha deve ter pelo menos 6 caracteres."
        );
      }

      return true;
    },
    []
  );

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
    [
      changePassword,
      isInitializing,
      login,
      logout,
      updateProfile,
      user,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
