function SkeletonPage() {
  return (
    <div className="skeleton-page" aria-label="Carregando conteudo">
      <div className="skeleton-block skeleton-hero" />
      <div className="skeleton-grid">
        <div className="skeleton-block" />
        <div className="skeleton-block" />
        <div className="skeleton-block" />
      </div>
      <div className="skeleton-block skeleton-table" />
    </div>
  );
}

export default SkeletonPage;
