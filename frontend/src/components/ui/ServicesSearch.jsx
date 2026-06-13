import { useMemo, useState } from "react";

function ServicesSearch({ services = [], title }) {
  const [query, setQuery] = useState("");

  /**
   * Busca local sobre os dados mockados.
   *
   * Integração backend:
   * - pode ser substituída por GET /services?search=texto;
   * - ou mantida localmente se a API retornar todos os serviços.
   */
  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return services;
    }

    return services.filter((service) =>
      `${service.name} ${service.type} ${service.description}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query, services]);

  if (!services.length) {
    return null;
  }

  return (
    <article className="services-search-card">
      <div className="services-search-header">
        <h2>{title}</h2>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pesquisar servico"
          aria-label="Pesquisar servico"
        />
      </div>

      <div className="services-results">
        {filteredServices.map((service) => (
          <div className="service-result" key={service.name}>
            <div>
              <span>{service.type}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}

        {!filteredServices.length && (
          <p className="empty-state">Nenhum servico encontrado para a pesquisa.</p>
        )}
      </div>
    </article>
  );
}

export default ServicesSearch;
