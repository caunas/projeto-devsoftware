import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { getApiErrorMessage } from "../../services/api";
import { createEvento, getEventos, mapEvento } from "../../services/eventService";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

function formatKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function CoordinatorEventCalendar({ initialEvents = [], title }) {
  const { notify } = useUI();
  const { user } = useAuth();
  const today = new Date();
  /*
   * Integracao backend:
   * - carregar eventos com GET /coordinators/me/events?month=<1-12>&year=<ano>;
   * - manter date em ISO curto (YYYY-MM-DD) para agrupar os blocos por dia.
   */
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(formatKey(today.getFullYear(), today.getMonth(), today.getDate()));
  const [events, setEvents] = useState(initialEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    title: "",
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: firstDay }, () => null);

    for (let day = 1; day <= totalDays; day += 1) {
      days.push(day);
    }

    return days;
  }, [month, year]);

  const eventsByDate = useMemo(
    () =>
      events.reduce((groupedEvents, event) => {
        groupedEvents[event.date] = [...(groupedEvents[event.date] || []), event];
        return groupedEvents;
      }, {}),
    [events]
  );

  const selectedEvents = eventsByDate[selectedDate] || [];

  useEffect(() => {
    let isActive = true;

    async function loadEvents() {
      setIsLoading(true);

      try {
        const data = await getEventos();

        if (isActive) {
          setEvents(data.map(mapEvento));
        }
      } catch (error) {
        if (isActive) {
          notify(getApiErrorMessage(error, "Nao foi possivel carregar os eventos."), "error");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isActive = false;
    };
  }, [notify]);

  if (!title) {
    return null;
  }

  function changeMonth(direction) {
    setMonth((currentMonth) => {
      const nextMonth = currentMonth + direction;

      if (nextMonth < 0) {
        setYear((currentYear) => currentYear - 1);
        return 11;
      }

      if (nextMonth > 11) {
        setYear((currentYear) => currentYear + 1);
        return 0;
      }

      return nextMonth;
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  /**
   * Publica evento no dia selecionado do calendario.
   *
   * Integração backend:
   * - substituir por POST /coordinators/me/events;
   * - enviar date, title, description e location.
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      notify("Preencha titulo, descricao e localizacao do evento.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const createdEvent = await createEvento({
        coordinatorId: user.id,
        date: selectedDate,
        description: formData.description.trim(),
        location: formData.location.trim(),
        title: formData.title.trim(),
      });

      setEvents((currentEvents) => [...currentEvents, mapEvento(createdEvent)]);
      setFormData({ description: "", location: "", title: "" });
      notify("Evento publicado com sucesso.", "success");
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel publicar o evento."), "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="calendar-manager">
      <section className="activity-publisher">
        <h2>Adicionar evento</h2>
        <p className="calendar-selected-date">Data selecionada: {selectedDate}</p>
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
          <button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Publicar evento"}</button>
        </form>
      </section>

      <section className="monthly-calendar">
        <div className="monthly-calendar-header">
          <h2>{title}</h2>
          <div className="calendar-controls">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior">
              ‹
            </button>
            <strong>{monthNames[month]} {year}</strong>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Proximo mes">
              ›
            </button>
          </div>
          <div className="calendar-selectors">
            <select value={month} onChange={(event) => setMonth(Number(event.target.value))} aria-label="Alterar mes">
              {monthNames.map((monthName, index) => (
                <option key={monthName} value={index}>{monthName}</option>
              ))}
            </select>
            <input
              type="number"
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              aria-label="Alterar ano"
              min="2020"
              max="2035"
            />
          </div>
        </div>

        <div className="calendar-weekdays">
          {weekDays.map((weekDay) => (
            <span key={weekDay}>{weekDay}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div className="calendar-day empty" key={`empty-${index}`} />;
            }

            const key = formatKey(year, month, day);
            const dayEvents = eventsByDate[key] || [];
            const isSelected = selectedDate === key;

            return (
              <button
                className={`calendar-day ${dayEvents.length ? "has-event" : ""} ${isSelected ? "selected" : ""}`.trim()}
                key={key}
                type="button"
                onClick={() => setSelectedDate(key)}
              >
                <strong>{day}</strong>
                {dayEvents.length > 0 && <span>{dayEvents.length} evento(s)</span>}
              </button>
            );
          })}
        </div>

        <div className="calendar-event-details">
          <h3>Detalhes do dia</h3>
          {selectedEvents.length ? (
            selectedEvents.map((event) => (
              <div className="calendar-event-detail" key={`${event.date}-${event.title}`}>
                <strong>{event.title}</strong>
                <span>{event.location}</span>
                <p>{event.description}</p>
              </div>
            ))
          ) : (
            <p>Nenhum evento cadastrado para este dia.</p>
          )}
        </div>
      </section>
    </article>
  );
}

export default CoordinatorEventCalendar;
