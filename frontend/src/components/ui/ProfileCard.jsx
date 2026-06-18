function ProfileCard({ fields = [], title }) {
  if (!fields.length) {
    return null;
  }

  const name = fields.find((field) => field.label.trim().toLowerCase() === "nome")?.value || "Usuario";
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  return (
    <article className="profile-card">
      <div className="profile-photo-placeholder" aria-label={`Identificacao de ${name}`}>
        <span>{initials}</span>
      </div>
      <div className="profile-card-content">
        <h2>{title}</h2>
        <div className="profile-field-grid">
          {fields.map((field) => (
            <div className="profile-field" key={field.label}>
              <span>{field.label}</span>
              <strong>{field.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProfileCard;
