function DataTable({ rows = [], title }) {
  if (!rows.length) {
    return null;
  }

  return (
    <article className="table-card">
      <h2>{title}</h2>
      <div className="data-list">
        {rows.map((row) => (
          <div className="data-row" key={`${row.title}-${row.detail}`}>
            <strong>{row.title}</strong>
            <span>{row.detail}</span>
            <div className={`status-pill ${row.variant || ""}`.trim()}>
              {row.status}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default DataTable;
