import React, { useState } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../app/service/UsuarioService";
import {mostrarMsgSucesso, mostrarMsgErro} from '../components/toastr';

function CadastroUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaAgain, setSenhaAgain] = useState('');
    const navigate = useNavigate();

    const cadastrar = () => {

        const usuario = {
            nome:nome,
            email:email,
            senha:senha,
            senhaAgain:senhaAgain
        };

        try{
            service.validar(usuario);
        }catch(error){
            let msgs = error.mensagens;
            msgs.forEach(msg => mostrarMsgErro(msg));
            return false;
        }

        service.salvar(usuario).then(response => {
            mostrarMsgSucesso('Usuario cadastrado com sucesso. Faca o Login para acessar o sistema')
            navigate('/login');
        }).catch(error => {
            mostrarMsgErro(error.response.data)
        })
    };

    const service = new UsuarioService();

    const cancelar = () => {
        navigate('/login');  // Substitua a rota pelo caminho desejado ao cancelar
    };

    return (
        <Card title="Cadastro de usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input
                                type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                id="inputNome"
                                className="form-control"
                                name="nome"
                            />
                        </FormGroup>

                        <FormGroup label="Email: *" htmlFor="inputEmail">
                            <input
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="inputEmail"
                                className="form-control"
                                name="email"
                            />
                        </FormGroup>

                        <FormGroup label="Senha: *" htmlFor="inputPassword">
                            <input
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                id="inputPassword"
                                className="form-control"
                                name="senha"
                            />
                        </FormGroup>

                        <FormGroup label="Confirme sua Senha: *" htmlFor="inputPasswordAgain">
                            <input
                                type="password"
                                value={senhaAgain}
                                onChange={e => setSenhaAgain(e.target.value)}
                                id="inputPasswordAgain"
                                className="form-control"
                                name="senhaAgain"
                            />
                        </FormGroup>
                        <br/>
                        <button onClick={cadastrar} title="Salvar" type="button" className="btn btn-success">
                                    <i className="pi pi-save"> Salvar </i>
                        </button>
                        <button onClick={cancelar} title="Cancelar" type="button" className="btn btn-danger">
                                    <i className="pi pi-times"> Cancelar </i>

                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CadastroUsuario;
