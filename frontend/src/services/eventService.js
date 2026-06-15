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

export const createEvento = async ({ coordinatorId, date, description, location, title }) => {
  const response = await api.post("/eventos", {
    coordenador: { id: coordinatorId },
    dataEvento: `${date}T12:00:00`,
    descricao: description,
    local: location,
    titulo: title,
  });

  return response.data;
};

export function mapEvento(evento) {
  return {
    id: evento.id,
    date: evento.dataEvento?.slice(0, 10),
    description: evento.descricao,
    location: evento.local,
    title: evento.titulo,
  };
}
