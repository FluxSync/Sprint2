var database = require("../database/config")

function cadastrar(prateleiras_gondolas, tamanho_prateleiras, nome_setor, idGestor) {
    var instrucao = `
        INSERT INTO gondola (qtdPrateleiras, tamanhoGondola, setorMercado, fkGestor) VALUES ('${prateleiras_gondolas}', '${tamanho_prateleiras}', '${nome_setor}', '${idGestor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};