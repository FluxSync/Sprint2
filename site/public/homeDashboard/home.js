var gondolas = '';
var prateleiras = '';
var sensores = '';

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
var setor = "";

function setores() {
  fetch(`/dashboardRoutes/setores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO setores()!");

    if (resposta.ok) {
      resposta.json().then((json) => {
        console.log(json);

        // Extrair os setores do mercado da resposta
        for (var i = 0; i < json.length; i++) {
          setorMercado.push(json[i]);
        }

        // Selecionar o elemento select existente
        var selectSetor = document.getElementById('select_setor');

        // Criar as opções para o select
        for (var i = 0; i < setorMercado.length; i++) {
          var option = document.createElement('option');
          option.value = setorMercado[i].nomeSetor;
          option.text = setorMercado[i].nomeSetor;
          selectSetor.appendChild(option);
        }
        console.log(setorMercado[0]);
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

var setorSelecionado = '';

function verSetor() {
  setorSelecionado = select_setor.value;
  fetch(`/dashboardRoutes/verSetor/${setorSelecionado}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO verSetor()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.gondolas, json.prateleiras, json.sensores)

        gondolas_ = json.gondolas;
        prateleiras = json.prateleiras;
        sensores = json.sensores;

        gondolasNoSetor.innerHTML = `Gôndolas no setor: ${gondolas_}`
        prateleirasNoSetor.innerHTML = `Prateleiras no setor: ${prateleiras}`
        sensoresNoSetor.innerHTML = `Sensores no Setor: ${prateleiras * 10}`
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

function changeSelect() {
  let select_setor = document.getElementById("select_setor");
  let nomeDoSetor = document.getElementById("nomeDoSetor");
  let infoSetor = document.getElementById("infoSetor");

  let setorSelecionado = select_setor.value;

  if (setorSelecionado) {
    infoSetor.style.display = "flex";
    gondolasNoSetor.innerHTML = `Gôndolas no Setor: ${gondolas}`;
    prateleirasNoSetor.innerHTML = `Prateleiras no Setor: ${prateleiras}`;
    sensoresNoSetor.innerHTML = `Sensores no Setor: ${sensores}`;
    nomeDoSetor.innerHTML = `Setor de ${setorSelecionado}`;

    // Atualizar a variável setor com o valor selecionado
    setor = setorSelecionado;
  } else {
    infoSetor.style.display = "none";
    nomeDoSetor.innerHTML = "Setor não Selecionado";
  }
}

