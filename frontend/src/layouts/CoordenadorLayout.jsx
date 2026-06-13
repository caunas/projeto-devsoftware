import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function CoordenadorLayout({ children }) {
    return (
        <div className="dashboard-container">

            <Sidebar tipo="coordenador" />

            <main className="dashboard-content">
                {children || <Outlet />}
            </main>

        </div>
    );
}

export default CoordenadorLayout;
