import { Link } from "react-router-dom";
import {
  FaBrain,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaNetworkWired,
  FaShieldAlt,
} from "react-icons/fa";
import BrandLogo from "../../components/brand/BrandLogo";
import ThemeToggle from "../../components/theme/ThemeToggle";
import "./Home.css";

const programs = [
  {
    icon: FaCode,
    title: "Desenvolvimento de Software",
    description: "Formacao pratica em frontend, backend, APIs, testes, arquitetura e experiencia de usuario.",
  },
  {
    icon: FaDatabase,
    title: "Dados e Inteligencia Artificial",
    description: "Modelagem, SQL, visualizacao, aprendizado de maquina e tomada de decisao orientada por dados.",
  },
  {
    icon: FaShieldAlt,
    title: "Ciberseguranca",
    description: "Redes, seguranca ofensiva e defensiva, resposta a incidentes e governanca digital.",
  },
];

const labs = [
  "Laboratorio de cloud computing",
  "Hub de startups e produto digital",
  "Ambiente de simulacao em ciberseguranca",
  "Mentorias com profissionais de tecnologia",
];

function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <BrandLogo />
        <nav className="home-nav" aria-label="Navegacao inicial">
          <a href="#cursos">Cursos</a>
          <a href="#laboratorios">Laboratorios</a>
          <ThemeToggle className="home-theme-toggle" />
          <Link className="home-login-link" to="/login">Login</Link>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-eyebrow">Tecnologia, produto e inovacao</span>
          <h1>Uma faculdade para quem quer construir o futuro digital.</h1>
          <p>
            A Nova Luz prepara profissionais para atuar em software, dados,
            inteligencia artificial, ciberseguranca e gestao de produtos digitais
            com projetos praticos desde o primeiro semestre.
          </p>
          <div className="home-actions">
            <Link className="home-primary-action" to="/login">
              Acessar login
            </Link>
            <a className="home-secondary-action" href="#cursos">
              Ver cursos
            </a>
          </div>
        </div>

        <div className="home-hero-panel" aria-label="Indicadores academicos">
          <div className="home-panel-stat">
            <strong>86%</strong>
            <span>Das aulas com pratica em laboratorio</span>
          </div>
          <div className="home-panel-stat">
            <strong>24</strong>
            <span>Projetos aplicados por semestre</span>
          </div>
          <div className="home-panel-note">
            <FaLaptopCode aria-hidden="true" />
            <p>Curriculo conectado a desenvolvimento, dados, cloud e seguranca.</p>
          </div>
        </div>
      </section>

      <section className="home-section" id="cursos">
        <div className="home-section-heading">
          <span>Areas de formacao</span>
          <h2>Cursos orientados ao mercado de tecnologia</h2>
        </div>

        <div className="home-grid">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article className="home-card" key={program.title}>
                <Icon aria-hidden="true" />
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section home-tech-band" id="laboratorios">
        <div>
          <span>Estrutura aplicada</span>
          <h2>Aprendizado com ferramentas reais</h2>
          <p>
            Os estudantes trabalham em desafios de produto, automacao, dados,
            infraestrutura e seguranca usando metodologias aplicadas em times de tecnologia.
          </p>
        </div>

        <ul>
          {labs.map((lab) => (
            <li key={lab}>
              <FaNetworkWired aria-hidden="true" />
              <span>{lab}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section home-metrics">
        <article>
          <FaBrain aria-hidden="true" />
          <strong>IA aplicada</strong>
          <span>Projetos com automacao, analise preditiva e prototipacao.</span>
        </article>
        <article>
          <FaChartLine aria-hidden="true" />
          <strong>Produto digital</strong>
          <span>Do problema ao MVP, com pesquisa, design e metricas.</span>
        </article>
        <article>
          <FaLaptopCode aria-hidden="true" />
          <strong>Portifolio pratico</strong>
          <span>Entregas reais para demonstrar competencia tecnica.</span>
        </article>
      </section>
    </main>
  );
}

export default Home;
