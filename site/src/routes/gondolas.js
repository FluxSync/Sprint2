var express = require("express");
var router = express.Router();

var gondolasController = require("../controllers/gondolasController");

router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    gondolasController.cadastrar(req, res);
});


module.exports = router;