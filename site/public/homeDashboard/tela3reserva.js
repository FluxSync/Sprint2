function otimo() {
  alert("Tempo Otímo: Abaixo de 4 Horas");
}
function bom() {
  alert("Tempo Bom: Entre 4-8 Horas");
}
function ruim() {
  alert("Tempo Ruim: Entre 9-24 Horas");
}
function pessimo() {
  alert("Tempo Péssimo: Acima de 24 Horas");
}

var teste = 0;
var clock = document.getElementById('UltimaReposicaoHtml');

function velocidadeUltimaReposicao() {
  fetch(`/dashboardRoutes/velocidadeUltimaReposicao`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO velocidadeUltimaReposicao()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.ultima)

        var ultima = json.ultima;
        var horas = parseInt(ultima.split(':')[0], 10);
        teste = Number(horas)

        clock.innerHTML = `${ultima}`
        

        
        if (teste < 4) {
          clock.style.backgroundColor = 'rgb(4, 160, 14)';
          clock.style.borderColor = '#055a0b';
        } else if (teste >= 4 || teste <= 8) {
          clock.style.backgroundColor = 'rgb(255, 255, 0)';
          clock.style.borderColor = '#b0b007';
        } else if (teste >= 9 || teste <= 24) {
          clock.style.backgroundColor = 'rgb(255, 69, 0)';
          clock.style.borderColor = '#c43602';
        } else {
          clock.style.backgroundColor = 'rgb(132, 3, 3)';
          clock.style.borderColor = '#6e0303';
        }
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

function ultimaEstocagem() {
  fetch(`/dashboardRoutes/ultimaEstocagem`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO ultimaEstocagem()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.ultima)

        var ultima = json.ultima;

        ultimaEstocagemHtml.innerHTML = `${ultima}`;
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

function horasSemEstoque() {
  fetch(`/dashboardRoutes/horasSemEstoque`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO horasSemEstoque()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.tempoSemEstoque)

        var horas = json.tempoSemEstoque;

        tempoSemEstoqueHtml.innerHTML = `${horas}`;
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

function messesComMaisReposicao() {
  fetch(`/dashboardRoutes/messesComMaisReposicao`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO messesComMaisReposicao()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.mes1, json.reposicao1)

        mes1.innerHTML = `1° ${json.mes1} - (${json.reposicao1})`;
        mes2.innerHTML = `2° ${json.mes2} - (${json.reposicao2})`;
        mes3.innerHTML = `3° ${json.mes3} - (${json.reposicao3})`;
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

var statusSensor = [];
var horaRegistro = [];

function grafico() {
  fetch(`/dashboardRoutes/grafico`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO grafico()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json)

        for (var i = 0; i < json.length; i++) {
          statusSensor.push(json[i].statusSensor)
          horaRegistro.push(json[i].horaRegistro)
        }
        criarGrafico()
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });

}

function criarGrafico() {
  const dash = document.getElementById("dash");

  new Chart(dash, {
    type: "line",
    data: {
      labels: horaRegistro,
      datasets: [
        {
          label: "Gôndola",
          data: statusSensor,
          borderWidth: 4,
          backgroundColor: "blue",
          borderColor: "#00ff00",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Últimos 7 registros",
            color: "white",// Título do eixo X
            font: {
              weight: "bold", // Estilo da fonte (negrito)
              size: 16, // Tamanho da fonte
              family: "Arial", // Tipo de fonte
            },
            padding: {
              // Preenchimento do título
              top: 10,
              bottom: 10,
            },
          },
          ticks: {
            color: "white"
          }
        },
        y: {
          display: false, // Ocultar escala do eixo Y
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top", // Posição da legenda
        },
      },
    },
  });
}
