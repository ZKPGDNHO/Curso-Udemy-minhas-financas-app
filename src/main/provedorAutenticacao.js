import React, { useState } from "react";

import AuthService from "../app/service/authService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = AuthContext.Provider;

function ProvedorAutenticacao (props) {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [isAutenticado, setIsAutenticado] = useState(false);

  
    const iniciarSessao = (usuario) => {

        AuthService.logar(usuario);
        setIsAutenticado(true);
        setUsuarioAutenticado(usuario);
    }

    const encerrarSessao = () => {

        AuthService.removerUsuarioAutenticado();
        setIsAutenticado(false);
        setUsuarioAutenticado(null);
    }

    const contexto ={
        usuarioAutenticado:usuarioAutenticado,
        isAutenticado:isAutenticado,
        iniciarSessao: iniciarSessao,
        encerrarSessao: encerrarSessao
    }

    return(

        <AuthProvider value={contexto}>
            {props.children}
        </AuthProvider>
    )
}

export default ProvedorAutenticacao