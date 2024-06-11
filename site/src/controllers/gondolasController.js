var gondolasModel = require("../models/gondolasModel");

function cadastrarSetor(req, res) {
    var nome_setor = req.body.nome_setorServer;
    var idGestor = req.body.idGestorServer;

    if (nome_setor == undefined) {
        res.status(400).send("O nome do seu setor está undefined!");
    }

    if (idGestor == undefined) {
        res.status(400).send("O ID do gestor está undefined!");
    }

    gondolasModel.cadastrarSetor(nome_setor, idGestor).then(function (resposta) {
        res.status(200).send("Carro criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function puxarIdSetor(req, res) {
    gondolasModel.puxarIdSetor()
        .then(function (respostapuxarIdSetor) {
            res.json({
                idSetor: respostapuxarIdSetor[0].idSetor
            });
        })
        .catch(function (erro) {
            console.error(erro);
            console.error("Houve um erro ao obter o puxarIdSetor! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarGondolas(req, res) {
    var gondolas = req.body.gondolasServer;
    var prateleiras = req.body.prateleiras_gondolasServer;
    var tamanho = req.body.tamanho_prateleirasServer;
    var fkSetor = req.body.fkSetorServer;

    if (gondolas == undefined) {
        res.status(400).send("as gondolas do seu setor está undefined!");
    }

    if (prateleiras == undefined) {
        res.status(400).send("as prateleiras do seu setor está undefined!");
    }

    if (tamanho == undefined) {
        res.status(400).send("o tamanho do seu setor está undefined!");
    }

    if (fkSetor == undefined) {
        res.status(400).send("O ID do setor está undefined!");
    }

    gondolasModel.cadastrarGondolas(gondolas, prateleiras, tamanho, fkSetor).then(function (resposta) {
        res.status(200).send("Carro criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrarSetor,
    puxarIdSetor,
    cadastrarGondolas
}