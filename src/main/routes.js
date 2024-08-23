import React, { useContext } from "react";
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import Login from "../views/Login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos";
import { AuthContext } from "./provedorAutenticacao";

function RotaAutenticada({ element: Element, ...rest }) {
    const { isAutenticado } = useContext(AuthContext);
    return isAutenticado ? <Element {...rest} /> : <Navigate to="/login" replace />;
}

function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/cadastro-lancamentos/:id?" element={<RotaAutenticada element={CadastroLancamentos} />} />
                <Route path="/consulta-lancamentos" element={<RotaAutenticada element={ConsultaLancamentos} />} />
                <Route path="/home" element={<RotaAutenticada element={Home} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
            </Routes>
        </HashRouter>
    );
}

export default Rotas;
