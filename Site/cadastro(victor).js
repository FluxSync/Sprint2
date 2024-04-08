var nomeEmpresa = input_empresa.value;
var cnpj = '';
var emailEmpresa = '';
var telefone = '';
var nomeGestor = '';
var emailGestor = input_emailGestor.value;
var senha = input_senha.value;
var confirmarSenha = input_confirmarSenha.value;

function validarcnpj(){
    var mensagemCnpj = '';
    cnpj = input_cnpj.value;
    var tamanhoCnpj = cnpj.length;
    if(tamanhoCnpj != 12){
        mensagemCnpj = (`Cnpj inválido`);
    }
    div_mensagemCnpj.innerHTML = mensagemCnpj;
}
function validarEmailEmpresa() {
    var mensagemEmailEmpresa = '';
    emailEmpresa = input_emailEmpresa.value;
    var emailCom = emailEmpresa.endsWith('.com');
    var emailArroba = emailEmpresa.indexOf("@");
    if(emailCom == false || emailArroba == false){
        mensagemEmailEmpresa = ('Email inválido')
    }
    div_mensagemEmailEmpresa.innerHTML = mensagemEmailEmpresa;
}
function validarTelefone(){
    var mensagemTelefone = '';
    telefone = input_telefone.value;
    var leitorTelefone = telefone.length;
    if(leitorTelefone != 11){
        mensagemTelefone = ('Telefone inválido')
    }
    div_mensagemTelefone.innerHTML = mensagemTelefone;
}
function validarEmailGestor(){
    var mensagemEmailGestor = '';
    emailGestor = input_emailGestor.value;
    var emailCom = emailGestor.endsWith('.com');
    var emailArroba = emailGestor.indexOf("@");
    if(emailCom == false || emailArroba == false){
        mensagemEmailGestor = ('Email inválido')
    }
    div_mensagemEmailGestor.innerHTML = mensagemEmailGestor;
}
function validarSenha() {
    var mensagemSenha = '';
    if(){

    }
}
function validarTudo() {
    validarcnpj();
    validarEmailEmpresa();
    validarTelefone();
    validarEmailGestor();
    validarSenha();
}