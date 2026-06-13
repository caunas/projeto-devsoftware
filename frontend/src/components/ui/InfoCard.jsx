function InfoCard({ description, label, title }) {
  return (
    <article className="info-card">
      <span>{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </article>
  );
}

export default InfoCard;
