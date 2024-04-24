
var emailEmpresa = '';
var senha = '';


function validarEmailEmpresa() {
    emailEmpresa = input_emailEmpresa.value;
    var mensagemEmailEmpresa = '';
    var emailCom = emailEmpresa.endsWith('.com');
    var emailArroba = emailEmpresa.indexOf("@");
    if (emailCom == false || emailArroba == false) {
        mensagemEmailEmpresa = ('Email inválido')
    } else {
        return true;
    }
    div_mensagemEmailEmpresa.innerHTML = mensagemEmailEmpresa;

    return true;
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
    } else {
        return true;
    }

    div_mensagemSenha.innerHTML = mensagemSenha;

    return true;

}
var cadastroSetor = "/Site/cadastro-setor.html"
function validarTudo() {
    if (
        validarEmailEmpresa() &&
        validarSenha()
    ) {
        window.location.href = cadastroSetor;
    }
}
