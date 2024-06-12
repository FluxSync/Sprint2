var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/setores", function (req, res) {
    dashboardController.setores(req, res);
})

router.get("/verSetor/:setorSelecionado", function (req, res) {
    dashboardController.verSetor(req, res);
})

router.get("/gondolas", function (req, res) {
    dashboardController.gondolas(req, res);
})

router.get("/ultimaEstocagem", function (req, res) {
    dashboardController.ultimaEstocagem(req, res);
})

router.get("/horasSemEstoque", function (req, res) {
    dashboardController.horasSemEstoque(req, res);
})

router.get("/messesComMaisReposicao", function (req, res) {
    dashboardController.messesComMaisReposicao(req, res);
})

router.get("/velocidadeUltimaReposicao", function (req, res) {
    dashboardController.velocidadeUltimaReposicao(req, res);
})

router.get("/grafico", function (req, res) {
    dashboardController.grafico(req, res);
})

module.exports = router;