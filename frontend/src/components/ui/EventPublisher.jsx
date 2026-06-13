import { useState } from "react";
import { useUI } from "../../hooks/useUI";

function EventPublisher({ initialEvents = [], title }) {
  const { notify } = useUI();
  const [events, setEvents] = useState(initialEvents);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    title: "",
  });

  if (!title) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  /**
   * Publica evento somente em memória.
   *
   * Integração backend:
   * - recurso exclusivo do portal do coordenador;
   * - substituir por POST /coordinators/me/events.
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      notify("Preencha titulo, descricao e localizacao do evento.", "error");
      return;
    }

    setEvents((currentEvents) => [
      {
        detail: formData.location,
        status: "Publicado",
        title: formData.title,
      },
      ...currentEvents,
    ]);
    setFormData({ description: "", location: "", title: "" });
    notify("Evento publicado com sucesso.", "success");
  }

  return (
    <article className="activity-publisher">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event-title">Titulo do evento</label>
          <input
            id="event-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o titulo do evento"
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-description">Descricao do evento</label>
          <textarea
            id="event-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite a descricao do evento"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-location">Localizacao</label>
          <input
            id="event-location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Digite a localizacao"
          />
        </div>
        <button type="submit">Publicar evento</button>
      </form>

      <div className="data-list">
        {events.map((eventItem, index) => (
          <div className="data-row" key={`${eventItem.title}-${eventItem.detail}-${index}`}>
            <strong>{eventItem.title}</strong>
            <span>{eventItem.detail}</span>
            <div className="status-pill">{eventItem.status}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default EventPublisher;
