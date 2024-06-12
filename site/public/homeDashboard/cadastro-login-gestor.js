function mudar(params) {
    let overlay = document.getElementById("overlay");
    overlay.style.transform = "translateX(0)";

    
  }
  
  function mudar2(params) {
    let overlay = document.getElementById("overlay");
    overlay.style.transform = "translateX(100%)";
  }
  



  var home = "index.html"
  function voltarHome() {
      window.location.href = home;
  }

  function cadastroGestor() {
      var idUsuario = sessionStorage.ID_USUARIO
      var nomeGestor = input_gestor.value
      var emailGestor = input_emailGestor.value
      var senhaGestor = input_senhaGestor.value


      if (

          nomeGestor == ""
          || emailGestor == ''
          || senhaGestor == ''

      ) {

          
              alert("(Mensagem de erro para todos os campos em branco)");


          return false;
      } else {

      }

      // Enviando o valor da nova input
      fetch("/usuarios/cadastrarGestor", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              // crie um atributo que recebe o valor recuperado aqui
              // Agora vá para o arquivo routes/usuario.js
              nomeGestorServer: nomeGestor,
              emailGestorServer: emailGestor,
              senhaGestorServer: senhaGestor,
              idUsuario: idUsuario

          }),
      })
          .then(function (resposta) {

              console.log("resposta: ", resposta);

              if (resposta.ok) {
                 
                  window.alert("Seu gestor foi cadastrado com sucesso!!");
                  window.location.href = "cadastro-login-gestor.html"

              } else {
                  throw ("Houve um erro ao tentar realizar o cadastro!");
              }
          }).catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);

          });
  }


  function autenticarGestor() {
      var emailGestorLogin = input_emailGestorLogin.value;
      var senhaGestorLogin = input_senhaGestorLogin.value;


      if (
          emailGestorLogin == ''
          || senhaGestorLogin == ''

      ) {
          
            alert("(Mensagem de erro para todos os campos em branco)");  

          return false;
      } else {

          // Enviando o valor da nova input
          fetch("/usuarios/autenticarGestor", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  emailServer: emailGestorLogin,
                  senhaServer: senhaGestorLogin
              })
          }).then(function (resposta) {
              console.log("ESTOU NO THEN DO autenticarGestor()!")

              if (resposta.ok) {
                  console.log(resposta);

                  resposta.json().then(json => {
                      console.log(json);
                      console.log(JSON.stringify(json));
                      sessionStorage.EMAIL_GESTOR = json.emailGestorLogin;
                      sessionStorage.NOME_GESTOR = json.nomeGestor;
                      sessionStorage.ID_GESTOR = json.idGestor;

                      setTimeout(function () {
                          window.location = "./cadastro-setor.html";
                      }, 1000); // apenas para exibir o loading

                  });

              } else {

                  console.log("Houve um erro ao tentar realizar o login!");

                  resposta.text().then(texto => {
                      console.error(texto);
                  });
              }

          }).catch(function (erro) {
              console.log(erro);
          })

          return false;
      }
  }