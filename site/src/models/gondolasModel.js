var database = require("../database/config")

function cadastrarSetor(nome_setor, idGestor) {
    var instrucao = `
        INSERT INTO setorMercado (nomeSetor, fkGestor) VALUES ('${nome_setor}', '${idGestor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxarIdSetor() {
    var instrucao = `
        select idSetor from setorMercado
order by idSetor desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarGondolas(gondolas, prateleiras, tamanho, fkSetor) {
    var instrucao = `
        INSERT INTO gondola (qtdGondolas, qtdPrateleiras, tamanhoGondola, fkSetor) VALUES ('${gondolas}', '${prateleiras}', '${tamanho}', '${fkSetor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarSetor,
    puxarIdSetor,
    cadastrarGondolas
};