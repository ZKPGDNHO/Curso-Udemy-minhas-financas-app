import React, { useState, useContext } from "react";
import Card from '../components/card';
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
//import axios from "axios";
import UsuarioService from "../app/service/UsuarioService";
import LocalStorageService from "../app/service/localstorageService";
import {mostrarMsgErro} from '../components/toastr'
import { AuthContext } from "../main/provedorAutenticacao"; 

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    //const [msgErro,setMsgErro] = useState(null);
    const navigate = useNavigate();

    const service = new UsuarioService();

    const authContext = useContext(AuthContext);

    const entrar = () => {

        const dadosLogin = {
            email: email,
            senha: senha
        };

        service.autenticar(dadosLogin)
        .then( response => {

            LocalStorageService.addItem('_usuario_logado', response.data)
            authContext.iniciarSessao(response.data)

            navigate('/home');
            
        }).catch(erro => {
            mostrarMsgErro(erro.response.data)
        })

        console.log('executado a requisicao');
    };

    const prepareCadastrar = () => {
        navigate('/cadastro-usuarios');  
    };

    return (
        <div className="row">
            <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-ld-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="ExampleInputEmail">
                                            <input type="email" 
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="form-control" id="ExampleInputEmail"
                                                aria-describedby="emailHelp" placeholder="Digite o Email"/>
                                        </FormGroup>

                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Digite a Senha"/>
                                        </FormGroup>

                                        <br/>
                                        <button onClick={entrar} title="Entrar" type="button" className="btn btn-success">
                                            <i className="pi pi-sign-in"> Entrar </i>
                                        </button>
                                        <button onClick={prepareCadastrar} title="Cadastrar" type="button" className="btn btn-danger">
                                            <i className="pi pi-user-plus"> Cadastrar </i>
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Login;
