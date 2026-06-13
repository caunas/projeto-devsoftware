function ProfileCard({ fields = [], title }) {
  if (!fields.length) {
    return null;
  }

  return (
    <article className="profile-card">
      <div className="profile-photo-placeholder" aria-label="Espaco reservado para foto de perfil">
        <span>Foto</span>
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
