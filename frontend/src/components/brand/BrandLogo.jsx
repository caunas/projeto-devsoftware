function BrandLogo({ compact = false, className = "" }) {
  return (
    <div className={`brand-logo ${compact ? "brand-logo-compact" : ""} ${className}`.trim()}>
      <img src="/logo.svg" alt="Nova Luz Faculdade" />
      {!compact && (
        <div className="brand-logo-text">
          <strong>Nova Luz</strong>
          <span>Faculdade</span>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
