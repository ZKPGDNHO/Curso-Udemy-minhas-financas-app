import ApiService from "../apiservice";
import ErroValidacao from "../exceptions/ErroValidacao";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(dados){
        return this.post('/autenticar', dados);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post('/',usuario);
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo nome é obrigatorio')
        }

        if(!usuario.email){
            erros.push('O campo email é obrigatorio')
        }else if(!usuario.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Informe um E-Mail valido, por favor')
        }
        if(!usuario.senha || !usuario.senhaAgain){
            erros.push('Os campos de senhas são obrigatorios')
        }else if(usuario.senha !==  usuario.senhaAgain){
            erros.push('Ambas as senhas precisam ser iguais')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }

   }
}

export default UsuarioService