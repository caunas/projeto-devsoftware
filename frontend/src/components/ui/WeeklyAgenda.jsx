function WeeklyAgenda({ days = [], title }) {
  if (!days.length) {
    return null;
  }

  return (
    <article className="weekly-agenda">
      <h2>{title}</h2>
      <div className="weekly-agenda-grid">
        {days.map((day) => (
          <div className="weekly-day" key={day.weekday}>
            <span>{day.weekday}</span>
            {day.classes.map((classItem) => (
              <div className="weekly-class" key={`${day.weekday}-${classItem.title}`}>
                <strong>{classItem.title}</strong>
                <p>{classItem.time}</p>
                <small>{classItem.description}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

export default WeeklyAgenda;
