function changeSelect() {
  let select_setor = document.getElementById("select_setor");
  let nomeDoSetor = document.getElementById("nomeDoSetor");
  let infoSetor = document.getElementById("infoSetor");

  let setorSelecionado = select_setor.value;

  if (setorSelecionado) {
    infoSetor.style.display = "flex";
    gondolasNoSetor.innerHTML = "Gôndolas no Setor: 14";
    prateleirasNoSetor.innerHTML = "Prateleiras no Setor: 56";
    sensoresNoSetor.innerHTML = "Sensores no Setor: 616";
    nomeDoSetor.innerHTML = `Setor de ${setorSelecionado}`;
  } else {
    infoSetor.style.display = "none";
    nomeDoSetor.innerHTML = "Setor não Selecionado";
  }
}

let select_setor = document.getElementById("select_setor");

select_setor.addEventListener("change", changeSelect);

changeSelect();

function tela2() {
  let setorSelecionado = select_setor.value;
  if (setorSelecionado) {
    var novaPagina = "tela2.html";
    window.location.href = novaPagina;
  } else {
    alert("Selecione um Setor");
  }
}

var setorMercado = [];

function setores() {
  fetch(`/dashboardRoutes/setores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO setores()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json)

        for (var i = 0; i < json.length; i++) {
          setorMercado.push(json[i].setorMercado)
        }

        console.log(setorMercado)
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

function verSetor() {
  fetch(`/dashboardRoutes/verSetor`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO verSetor()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.gondolas,json.prateleiras,json.sensores)

        var gondolas = json.gondolas;
        var prateleiras = json.prateleiras;
        var sensores = json.sensores;

        gondolasNoSetor.innerHTML = `Gôndolas no Setor: ${gondolas}`;
        prateleirasNoSetor.innerHTML = `Prateleiras no Setor: ${prateleiras}`;
        sensoresNoSetor.innerHTML = `Sensores no Setor: ${sensores}`;
        // nomeDoSetor.innerHTML = `Setor de ${setor}`;

      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

