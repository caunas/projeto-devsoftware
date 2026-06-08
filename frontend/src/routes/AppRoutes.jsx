import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import { Login } from "../pages/Login/Login.jsx";
import { InicioAluno } from "../pages/InicioAluno/InicioAluno.jsx"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Login />}></Route>
                <Route path = "/portal" element = {<InicioAluno />}></Route>
            </Routes>
        </BrowserRouter>
    )
}