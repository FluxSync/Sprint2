var gondolasModel = require("../models/gondolasModel");

function cadastrar(req, res) {
    var prateleiras_gondolas = req.body.prateleiras_gondolasServer;
    var tamanho_prateleiras = req.body.tamanho_prateleirasServer;
    var nome_setor = req.body.nome_setorServer;
    var idGestor = req.body.idGestorServer;

    if(prateleiras_gondolas == undefined) {
        res.status(400).send("As prateleiras da sua gôndola está undefined!");
    }

    if(tamanho_prateleiras == undefined) {
        res.status(400).send("O tamanho das prateleiras da sua gôndola está undefined!");
    }

    if(nome_setor == undefined) {
        res.status(400).send("O nome do seu setor está undefined!");
    }

    if(idGestor == undefined) {
        res.status(400).send("O ID do gestor está undefined!");
    }

    gondolasModel.cadastrar(prateleiras_gondolas, tamanho_prateleiras, nome_setor, idGestor).then(function(resposta){
        res.status(200).send("Carro criado com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar
}