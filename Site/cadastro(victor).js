var nomeEmpresa = input_empresa.value;
var cnpj = '';
var emailEmpresa = '';
var telefone = '';
var nomeGestor = '';
var emailGestor = ''
var senha = '';
var confirmarSenha = input_confirmarSenha.value;

function validarcnpj(){
    cnpj = input_cnpj.value;
    var mensagemCnpj = '';
    var tamanhoCnpj = cnpj.length;
    if(tamanhoCnpj != 12){
        mensagemCnpj = (`Cnpj inválido`);
    }
    div_mensagemCnpj.innerHTML = mensagemCnpj;
}
function validarEmailEmpresa() {
    emailEmpresa = input_emailEmpresa.value;
    var mensagemEmailEmpresa = '';
    var emailCom = emailEmpresa.endsWith('.com');
    var emailArroba = emailEmpresa.indexOf("@");
    if(emailCom == false || emailArroba == false){
        mensagemEmailEmpresa = ('Email inválido')
    }
    div_mensagemEmailEmpresa.innerHTML = mensagemEmailEmpresa;
}
function validarTelefone(){
    telefone = input_telefone.value;
    var mensagemTelefone = '';
    var leitorTelefone = telefone.length;
    if(leitorTelefone != 11){
        mensagemTelefone = ('Telefone inválido')
    }
    div_mensagemTelefone.innerHTML = mensagemTelefone;
}
function validarEmailGestor(){
    emailGestor = input_emailGestor.value;
    var mensagemEmailGestor = '';
    var emailCom = emailGestor.endsWith('.com');
    var emailArroba = emailGestor.indexOf("@");
    if(emailCom == false || emailArroba == false){
        mensagemEmailGestor = ('Email inválido')
    }
    div_mensagemEmailGestor.innerHTML = mensagemEmailGestor;
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
    validarcnpj();
    validarEmailEmpresa();
    validarTelefone();
    validarEmailGestor();
    validarSenha();
}