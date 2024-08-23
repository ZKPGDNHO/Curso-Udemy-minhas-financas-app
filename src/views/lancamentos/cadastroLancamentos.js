import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom'

import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from '../../components/toastr';
import LocalStorageService from "../../app/service/localstorageService";

function CadastroLancamentos() {

       

        const [id,setId] = useState(null);
        const [descricao,setDescricao] = useState('');
        const [valor,setValor] = useState('');
        const [mes,setMes] = useState('');
        const [ano,setAno] = useState('');
        const [status,setStatus] = useState('');
        const [tipo,setTipo] = useState('');
        const [usuario, setUsuario] = useState(null);
        const [atualizando, setAtualizando] = useState(false);

        const navigate = useNavigate();
        const {id: paramId} = useParams();

    
   const service = new LancamentoService();

   useEffect(() => {
    if (paramId) {
        service.ObterPorId(paramId)
            .then(response => {
                const { descricao, valor, mes, ano, tipo, status, usuario } = response.data;
                setId(response.data.id);
                setDescricao(descricao);
                setValor(valor);
                setMes(mes);
                setAno(ano);
                setTipo(tipo);
                setStatus(status);
                setAtualizando(true);
                setUsuario(usuario);
            })
            .catch(error => {
                messages.mostrarMsgErro(error.response.data);
            });
    }
}, [paramId]);


    const submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

       const lancamento = {
            descricao, 
            valor,
            mes,
            ano,
            tipo,
            usuario:usuarioLogado.id
       };


       try{
            service.validar(lancamento);
       }catch(erro){
            let mensagens = [];
            mensagens = erro.mensagens;
            mensagens.forEach(msg => {
                messages.mostrarMsgErro(msg);
            })
            return false;
       }

        service.salvar(lancamento)
        .then(response => {
            navigate('/consulta-lancamentos')
            messages.mostrarMsgSucesso('Lancamento cadastrado com sucesso!');
        }).catch(error => {
            messages.mostrarMsgErro(error.response.data);
        })
    }

    const atualizar = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

       const lancamento = {
        descricao, 
        valor,
        mes,
        ano,
        tipo,
        id,
        status,
        usuario:usuarioLogado.id
       }

        service.atualizar(lancamento)
        .then(response => {
            navigate('/consulta-lancamentos')
            messages.mostrarMsgSucesso('Lancamento atualizado com sucesso!');
        }).catch(error => {
            messages.mostrarMsgErro(error.response.data);
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'descricao':
                setDescricao(value);
                break;
            case 'valor':
                setValor(value);
                break;
            case 'mes':
                setMes(value);
                break;
            case 'ano':
                setAno(value);
                break;
            case 'tipo':
                setTipo(value);
                break;
            case 'status':
                setStatus(value);
                break;
            default:
                break;
        }
    };

    // main da classe
        const meses = service.obterListaMeses();

        const tipos = service.obterListaTipos();

       
        return(
            <Card title={atualizando ? 'Atualizacao de Lancamento' : 'Cadastro de Lancamentos'}>
                <div className="row">
                    <div className="col-md-12">

                        <FormGroup id="inputDescricao" label="Descricao: *">

                            <input id="inputDescricao" type="text" 
                                   className="form-control"
                                   name="descricao"
                                   value={descricao}
                                   onChange={handleChange} />

                        </FormGroup>

                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">

                        <FormGroup id="inputAno" label="Ano: *">

                            <input id="inputAno" type="text" 
                                   className="form-control" 
                                   name="ano"
                                   value={ano}
                                   onChange={handleChange} />

                        </FormGroup>

                    </div>

                    <div className="col-md-6">

                    <FormGroup id="inputMes" label="Mes: *">

                            <SelectMenu id="inputMes" lista={meses} 
                                        className="form-control"
                                        name="mes"
                                        value={mes}
                                        onChange={handleChange}/>

                    </FormGroup>

                    </div>
                </div>

                <div className="row">

                    <div className="col-md-4">

                         <FormGroup id="inputValor" label="Valor: *">

                                <input id="inputValor" type="text" 
                                       className="form-control"
                                       name="valor"
                                       value={valor}
                                       onChange={handleChange} />

                        </FormGroup>

                    </div>

                    <div className="col-md-4">

                         <FormGroup id="inputTipo" label="Tipo: *">

                            <SelectMenu id="inputTipo" lista={tipos} 
                                        className="form-control" 
                                        name="tipo"
                                        value={tipo}
                                        onChange={handleChange}/>

                        </FormGroup>

                    </div>

                    <div className="col-md-4">

                         <FormGroup id="inputStatus" label="Status: ">

                            <input  type="text" className="form-control" 
                                     name="status"
                                     value={status}
                                     onChange={handleChange}
                                    disabled />
                        </FormGroup>
                        
                    </div>

                </div>

                <br/>
                    <div className="row">
                        <div className="col-md-6">
                            {
                                atualizando ? (<button onClick={atualizar} title="Atualizar" className="btn btn-primary">
                                                           <i className="pi pi-refresh"> Atualizar </i> 
                                                </button> 
                                ) : (<button onClick={submit} title="Salvar" className="btn btn-success">
                                            <i className="pi pi-save"> Salvar </i>
                                    </button>)
                                
                            }

                            <button onClick={e => navigate('/consulta-lancamentos')} className="btn btn-danger">
                                        <i className="pi pi-times"> Cancelar </i>
                            </button>
                        </div>

                    </div>
                   

            </Card>
        )

}

export default CadastroLancamentos;