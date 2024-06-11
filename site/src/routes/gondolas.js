var express = require("express");
var router = express.Router();

var gondolasController = require("../controllers/gondolasController");

router.post("/cadastrarSetor", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    gondolasController.cadastrarSetor(req, res);
});

router.get("/puxarIdSetor", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    gondolasController.puxarIdSetor(req, res);
});

router.post("/cadastrarGondolas", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    gondolasController.cadastrarGondolas(req, res);
});

module.exports = router;