import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import BrandLogo from "../brand/BrandLogo";
import ThemeToggle from "../theme/ThemeToggle";
import { portalMenus } from "../../data/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { getPortalPath } from "../../utils/portalPath";
import "./Sidebar.css";

export default function Sidebar({ tipo = "aluno" }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { notify } = useUI();
  const profile = portalMenus[tipo] ? tipo : "aluno";
  const menu = portalMenus[profile];

  function handleLogout() {
    logout();
    notify("Sessao encerrada com sucesso.", "info");
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <BrandLogo compact className="sidebar-logo" />
        <div>
          <h2>{menu.title}</h2>
          <p>{user?.name || menu.subtitle}</p>
        </div>
      </div>

      <div className="sidebar-actions">
        <ThemeToggle className="sidebar-theme-toggle" />
      </div>

      <nav className="sidebar-nav">
        {menu.items.map((item) => {
          const Icon = item.icon;
          const to = getPortalPath(profile, item.path);

          return (
            <NavLink
              key={item.label}
              to={to}
              end={!item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className="sidebar-logout" type="button" onClick={handleLogout}>
        <FaSignOutAlt aria-hidden="true" />
        <span>Sair</span>
      </button>
    </aside>
  );
}
