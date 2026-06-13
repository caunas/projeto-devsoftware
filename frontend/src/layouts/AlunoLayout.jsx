import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function AlunoLayout({ children }) {
    return (
        <div className="dashboard-container">

            <Sidebar tipo="aluno" />

            <main className="dashboard-content">
                {children || <Outlet />}
            </main>

        </div>
    );
}

export default AlunoLayout;
