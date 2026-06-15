import { useEffect, useState } from "react";
import { PortalPage } from "../../components/ui";
import { coordenadorPages } from "../../data/portalPages";
import api from "../../services/api";

function Eventos() {
  const [page, setPage] = useState(coordenadorPages.eventos);

  async function load() {
    const response = await api.get("/eventos");

    const eventos = response.data.map((e) => ({
      date: new Date(e.dataEvento).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      title: e.titulo,
      description: e.descricao,
      location: e.local,
    }));

    setPage((prev) => ({
      ...coordenadorPages.eventos,
      eventCalendar: {
        ...prev.eventCalendar,
        events,
      },
    }));
  }

  useEffect(() => {
    load();
  }, []);

  return <PortalPage page={page} onRefresh={load} />;
}

export default Eventos;