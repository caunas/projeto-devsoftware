import axios from "axios";

/**
 * Cliente HTTP central do frontend.
 *
 * Integração backend:
 * - Defina VITE_API_BASE_URL no .env apontando para a API real.
 * - Mantenha todas as chamadas REST passando por esta instância.
 * - Adicione aqui interceptors de JWT para evitar duplicação nas páginas.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

export const TOKEN_STORAGE_KEY = "portal-auth-token";

/**
 * Interceptor preparado para JWT.
 *
 * Quando a integração real existir, leia o access token do AuthContext,
 * localStorage, sessionStorage ou de um token manager dedicado e injete:
 *
 * config.headers.Authorization = `Bearer ${accessToken}`;
 */
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * Interceptor de erro.
 *
 * Hoje apenas normaliza a rejeição. Na integração JWT, este é o ponto para:
 * - detectar status 401;
 * - chamar /auth/refresh;
 * - repetir a requisição original com o novo access token;
 * - forçar logout se o refresh token expirar.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem("portal-auth-user");
    }

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error, fallbackMessage) {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    (error.response?.status === 401 ? "Sessao expirada ou credenciais invalidas." : null) ||
    (error.response?.status === 403 ? "Seu usuario nao possui permissao para esta operacao." : null) ||
    (error.code === "ERR_NETWORK" ? "Nao foi possivel conectar a API local." : null) ||
    fallbackMessage
  );
}

export default api;
