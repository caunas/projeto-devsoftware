function PageHeader({ badge, description, eyebrow, title }) {
  return (
    <header className="page-hero">
      <div>
        <div className="page-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {badge && <div className="hero-badge">{badge}</div>}
    </header>
  );
}

export default PageHeader;
