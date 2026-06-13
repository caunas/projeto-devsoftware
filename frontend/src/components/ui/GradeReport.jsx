function GradeReport({ grades = [], title }) {
  if (!grades.length) {
    return null;
  }

  const average = grades.reduce((total, grade) => total + grade.score, 0) / grades.length;

  return (
    <article className="grade-card">
      <div className="grade-card-header">
        <h2>{title}</h2>
        <div className="grade-average">
          <span>Media</span>
          <strong>{average.toFixed(1)}</strong>
        </div>
      </div>

      <div className="data-list">
        {grades.map((grade) => (
          <div className="data-row" key={grade.subject}>
            <strong>{grade.subject}</strong>
            <span>Nota {grade.score.toFixed(1)}</span>
            <div className="status-pill">{grade.status}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default GradeReport;
