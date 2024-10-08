import LocalStorageService from "./localstorageService";

export const USUARIO_LOGADO = '_usuario_logado'
export default class AuthService {

    static IsUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario){
        LocalStorageService.addItem(USUARIO_LOGADO, usuario);
    }

    static ObterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }
}