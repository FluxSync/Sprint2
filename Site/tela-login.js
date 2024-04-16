
var emailEmpresa = '';
var senha = '';


function validarEmailEmpresa() {
    emailEmpresa = input_emailEmpresa.value;
    var mensagemEmailEmpresa = '';
    var emailCom = emailEmpresa.endsWith('.com');
    var emailArroba = emailEmpresa.indexOf("@");
    if (emailCom == false || emailArroba == false) {
        mensagemEmailEmpresa = ('Email inválido')
    }
    div_mensagemEmailEmpresa.innerHTML = mensagemEmailEmpresa;
}

function validarSenha() {
    senha = input_senha.value;
    var mensagemSenha = '';
    if (senha.length < 8) {
        mensagemSenha = 'Senha deve ter no mínimo 8 caracteres.';
    }
    else if (!/[A-Z]/.test(senha)) {
        mensagemSenha = 'Senha deve conter pelo menos uma letra maiúscula.';
    }
    else if (!/[a-z]/.test(senha)) {
        mensagemSenha = 'Senha deve conter pelo menos uma letra minúscula.';
    }
    else if (!/[\W_]/.test(senha)) {
        mensagemSenha = 'Senha deve conter pelo menos um caractere especial.';
    }

    div_mensagemSenha.innerHTML = mensagemSenha;

}

function validarTudo() {

validarEmailEmpresa();
validarSenha();

}