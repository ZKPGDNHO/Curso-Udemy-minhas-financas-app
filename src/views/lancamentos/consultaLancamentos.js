import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messages from "../../components/toastr";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

function ConsultaLancamentos() {
    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});
    const [lancamentos, setLancamentos] = useState([]);

    const service = new LancamentoService();
    const navigate = useNavigate();

    const buscar = () => {

        if (!ano) {

            messages.mostrarMsgErro('O preenchimento do Ano é obrigatorio.');
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano,
            mes,
            tipo,
            descricao,
            usuario: usuarioLogado.id
        };

        service.consultar(lancamentoFiltro)
            .then(resposta => {

                const list = resposta.data;
                
                if(list.length < 1){
                    messages.mostrarMsgAlerta("Nenhum resultado encontrado");
                }
                setLancamentos(resposta.data);

            }).catch(error => {
                
                console.log(error);
            });
    };

    const editar = (id) => {
        navigate(`/cadastro-lancamentos/${id}`);
    };

    const abrirConfirm = (lancamento) => {
        setShowConfirmDialog(true);
        setLancamentoDeletar(lancamento);
    };

    const cancelarDeletar = () => {
        setShowConfirmDialog(false);
        setLancamentoDeletar({});
    };

    const deletar = () => {
        service.deletar(lancamentoDeletar.id)

            .then(response => {

                const updatedLancamentos = lancamentos.filter(lanc => lanc.id !== lancamentoDeletar.id);
                setLancamentos(updatedLancamentos);
                setShowConfirmDialog(false);

                messages.mostrarMsgSucesso('Lancamento deletado com sucesso!');

            }).catch(error => {

                messages.mostrarMsgErro('Erro ao deletar lancamento');
            });
    };

    const FormularioCadastroSetup = () => {
        navigate('/cadastro-lancamentos')
    };

    const alterarStatus = (lancamento, status) => {

            service.alterarStatus(lancamento.id, status)
            .then(response => {
                // Certifique-se de que 'lancamentos' é um array
                const updatedLancamentos = [...lancamentos];
                const index = updatedLancamentos.findIndex(l => l.id === lancamento.id);
    
                if (index !== -1) {
                    // Atualiza o status do lançamento
                    updatedLancamentos[index].status = status;
                    setLancamentos(updatedLancamentos); // Atualiza o estado com o array modificado
                }
    
                messages.mostrarMsgSucesso('Status de lançamento atualizado com sucesso!');
            })
    }

    const meses = service.obterListaMeses();
    const tipos = service.obterListaTipos();

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDeletar} className="p-button-secondary" />
        </div>
    );

    return (
        <Card title="Consulta Lancamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                className="form-control"
                                id="inputAno"
                                value={ano}
                                onChange={e => setAno(e.target.value)}
                                placeholder="Digite o Ano" />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mes: ">
                            <SelectMenu id="inputMes"
                                value={mes}
                                onChange={e => setMes(e.target.value)}
                                className="form-control"
                                lista={meses} />
                        </FormGroup>

                        <FormGroup htmlFor="inputDesc" label="Descricao: ">
                            <input type="text"
                                className="form-control"
                                id="inputDesc"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                placeholder="Digite a Descricao de um lancamento" />
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo: ">
                            <SelectMenu id="inputTipo"
                                value={tipo}
                                onChange={e => setTipo(e.target.value)}
                                className="form-control"
                                lista={tipos} />
                        </FormGroup>

                        <br />

                        <button onClick={buscar} title="Buscar"
                                type="button" 
                                className="btn btn-success">
                                    <i className="pi pi-search"> Buscar </i>
                        </button>
                        <button onClick={FormularioCadastroSetup}  title="Cadastrar"
                                type="button" 
                                className="btn btn-danger">
                                    <i className="pi pi-plus"> Cadastrar </i>
                        </button>
                    </div>
                </div>
            </div>

            <br />

            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={lancamentos}
                            deleteAction={abrirConfirm}
                            editAction={editar}
                            alterarStatus = {alterarStatus} />
                    </div>
                </div>
            </div>

            <div>
                <Dialog header="Confirmacao" visible={showConfirmDialog}
                    style={{ width: '50vw' }} modal={true}
                    footer={confirmDialogFooter}
                    onHide={() => setShowConfirmDialog(false)}>
                    <p className="m-0">
                        Gostaria de deletar esse lancamento?
                    </p>
                </Dialog>
            </div>
        </Card>
    );
}

export default ConsultaLancamentos;
