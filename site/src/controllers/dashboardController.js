var dashboardModel = require("../models/dashboardModel");

function setores(req, res) {
  dashboardModel.setores()
    .then(function (resultadoEscolherSetores) {
      res.json(resultadoEscolherSetores);
    })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o escolherSetores! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function verSetor(req, res) {
  dashboardModel.verSetor()
      .then(function (respostaVerSetor) {
        res.json({
            gondolas: respostaVerSetor[0].quantidade_gondolas,
            prateleiras: respostaVerSetor[0].quantidade_prateleiras,
            sensores: respostaVerSetor[0].quantidade_sensores
        });
      })
      .catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao obter o verSetor! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function gondolas(req, res) {
  dashboardModel.gondolas()
      .then(function (respostaGondolas) {
        res.json({
          TotalGondolas: respostaGondolas[0].TotalGondolas,
          gondolasVazias: respostaGondolas[0].GondolasVazias
        });
      })
      .catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao obter o gondolas! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function velocidadeUltimaReposicao(req, res) {
  dashboardModel.velocidadeUltimaReposicao()
    .then(function (resultadovelocidadeUltimaReposicao) {
      res.json({
        ultima: resultadovelocidadeUltimaReposicao[0].tempo_reposicao_em_horas
    });
  })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o velocidadeUltimaReposicao! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function velocidadeUltimaReposicao(req, res) {
  dashboardModel.velocidadeUltimaReposicao()
    .then(function (resultadovelocidadeUltimaReposicao) {
      res.json({
        ultima: resultadovelocidadeUltimaReposicao[0].tempo_reposicao_em_horas
    });
  })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o velocidadeUltimaReposicao! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ultimaEstocagem(req, res) {
  dashboardModel.ultimaEstocagem()
    .then(function (resultadoUltimaEstocagem) {
      res.json({
       ultima : resultadoUltimaEstocagem[0].ultima_estocagem
    });
  })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o ultimaEstocagem! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function horasSemEstoque(req, res) {
  dashboardModel.horasSemEstoque()
    .then(function (resultadoHorasSemEstoque) {
      res.json({
        tempoSemEstoque: resultadoHorasSemEstoque[0].tempo_sensor_inativo
    });
  })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o horasSemEstoque! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function messesComMaisReposicao(req, res) {
  dashboardModel.messesComMaisReposicao()
      .then(function (respostaMessesComMaisReposicao) {
        res.json({
            mes1: respostaMessesComMaisReposicao[0].mes1,
            reposicao1: respostaMessesComMaisReposicao[0].total_reposicoes1,
            mes2: respostaMessesComMaisReposicao[0].mes2,
            reposicao2: respostaMessesComMaisReposicao[0].total_reposicoes2,
            mes3: respostaMessesComMaisReposicao[0].mes3,
            reposicao3: respostaMessesComMaisReposicao[0].total_reposicoes3
        });
      })
      .catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao obter o ranking! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function grafico(req, res) {
  dashboardModel.grafico()
    .then(function (resultadografico) {
      res.json(resultadografico);
    })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o grafico! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  setores,
  verSetor,
  gondolas,
  velocidadeUltimaReposicao,
  ultimaEstocagem,
  horasSemEstoque,
  messesComMaisReposicao,
  grafico
}