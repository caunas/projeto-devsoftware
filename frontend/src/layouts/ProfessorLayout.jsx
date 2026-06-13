import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function ProfessorLayout({ children }) {
    return (
        <div className="dashboard-container">

            <Sidebar tipo="professor" />

            <main className="dashboard-content">
                {children || <Outlet />}
            </main>

        </div>
    );
}

export default ProfessorLayout;
