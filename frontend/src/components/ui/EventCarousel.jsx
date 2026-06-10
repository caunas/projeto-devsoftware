import { useState } from "react";

function EventCarousel({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events.length) {
    return null;
  }

  const currentEvent = events[currentIndex];

  function goToPrevious() {
    setCurrentIndex((index) => (index === 0 ? events.length - 1 : index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => (index === events.length - 1 ? 0 : index + 1));
  }

  return (
    <article className="event-carousel">
      <div className="event-carousel-content">
        <span>{currentEvent.date}</span>
        <h2>{currentEvent.title}</h2>
        <p>{currentEvent.description}</p>
        <strong>{currentEvent.location}</strong>
      </div>

      <div className="event-carousel-controls">
        <button type="button" onClick={goToPrevious} aria-label="Evento anterior">
          ‹
        </button>
        <div className="event-carousel-dots" aria-label="Indicadores do carrossel">
          {events.map((event, index) => (
            <button
              className={index === currentIndex ? "active" : ""}
              key={event.title}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para ${event.title}`}
            />
          ))}
        </div>
        <button type="button" onClick={goToNext} aria-label="Proximo evento">
          ›
        </button>
      </div>
    </article>
  );
}

export default EventCarousel;
