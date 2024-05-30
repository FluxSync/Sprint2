var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarGestor", function (req, res) {
    usuarioController.cadastrarGestor(req, res);
})

router.post("/autenticarGestor", function (req, res) {
    usuarioController.autenticarGestor(req, res);
});

module.exports = router;