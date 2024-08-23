import toastr from "toastr"

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  export function mostrarMsg(titulo, msg, tipo){
    toastr[tipo](msg, titulo)
  }

  export function mostrarMsgErro(msg){
    mostrarMsg('ERRO', msg, 'error')
  }

  export function mostrarMsgSucesso(msg){
    mostrarMsg('SUCESSO', msg, 'success')
  }

  export function mostrarMsgAlerta(msg){
    mostrarMsg('ALERTA', msg, 'warning')
  }