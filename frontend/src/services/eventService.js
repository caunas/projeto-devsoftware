import api  from "./api";

/**
 * Eventos do sistema acadêmico
 * Backend:
 * GET /api/eventos
 */
export const getEventos = async () => {
  const response = await api.get("/eventos");
  return response.data;
};
