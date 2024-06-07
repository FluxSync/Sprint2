var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var emailEmpresa = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (emailEmpresa == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(emailEmpresa, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    res.status(200).json(resultadoAutenticar[0]);
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

}
                
function autenticarGestor(req, res) {
    var emailGestor = req.body.emailServer;
    var senhaGestor = req.body.senhaServer;

    if (emailGestor == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaGestor == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticarGestor(emailGestor, senhaGestor)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    res.status(200).json(resultadoAutenticar[0]);
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var empresa = req.body.empresaServer
    var cnpj = req.body.cnpjServer
    var emailEmpresa = req.body.emailServer
    var telefone = req.body.telefoneServer
    var senha = req.body.senhaServer
   


    // Faça as validações dos valores
    if (empresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (emailEmpresa == undefined) {
        res.status(400).send("Seu email da empresa está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }
  
    else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(empresa, senha, cnpj, emailEmpresa, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }   }


function cadastrarGestor(req, res) {

    
        var emailGestor = req.body.emailGestorServer
        var senhaGestor = req.body.senhaGestorServer
        var nomeGestor = req.body.nomeGestorServer
        var idUsuario = req.body.idUsuario

    usuarioModel.cadastrarGestor(idUsuario, nomeGestor, emailGestor,senhaGestor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    cadastrar,
    cadastrarGestor,
    autenticarGestor,
    autenticar

   
}