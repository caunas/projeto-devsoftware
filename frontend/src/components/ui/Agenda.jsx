function Agenda({ days = [], title }) {
  if (!days.length) {
    return null;
  }

  return (
    <article className="agenda-card">
      <h2>{title}</h2>
      <div className="agenda-list">
        {days.map((day) => (
          <div className={`agenda-day ${day.events?.length ? "" : "empty"}`.trim()} key={day.date}>
            <div className="agenda-date">
              <strong>{day.date}</strong>
              <span>{day.weekday}</span>
            </div>
            <div className="agenda-events">
              {day.events?.length ? (
                day.events.map((event) => (
                  <div className="agenda-event" key={`${day.date}-${event.title}`}>
                    <span>{event.time}</span>
                    <strong>{event.title}</strong>
                    <p>{event.description}</p>
                  </div>
                ))
              ) : (
                <div className="agenda-free">Dia sem aulas ou eventos cadastrados</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default Agenda;
