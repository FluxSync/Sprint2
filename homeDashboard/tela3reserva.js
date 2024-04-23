function otimo(params) {
    alert("Tempo Otímo: Entre 0-3 Horas");
  }
  function bom(params) {
    alert("Tempo Bom: Entre 4-8 Horas");
  }
  function ruim(params) {
    alert("Tempo Ruim: Entre 9-24 Horas");
  }
  function pessimo(params) {
    alert("Tempo Péssimo: Acima de 24 Horas");
  }
  
  const dash = document.getElementById("dash");
  
  new Chart(dash, {
    type: "line",
    data: {
      labels: ["29/09", "30/09", "01/10", "02/10", "03/10", "04/10", "05/10"],
      datasets: [
        {
          label: "Com Estoque",
          data: [0, 0, 1, 1, 1, 0, 0],
          borderWidth: 1,
          backgroundColor: "#11009e",
          borderColor: "#a20000",
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
            text: "Última Semana", // Título do eixo X
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
  