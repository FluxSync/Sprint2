const controls = document.querySelectorAll(".control");
let currentItem = 0;
let items = [];
let gondolasVazias = document.getElementById('gondolasVazias');

function checkBoxChanged() {
  let checkAll = document.getElementById("checkAll");
  let contains = document.querySelectorAll(".contains");

  if (!checkAll.checked) {
    contains.forEach((item) => {
      item.style.display = "block";
      setTimeout(() => {
        item.classList.remove("invisible");
      }, 500);
    });
  } else {
    contains.forEach((item) => {
      item.classList.add("invisible");
      setTimeout(() => {
        item.style.display = "none";
      }, 1000);
    });
  }
}

let checkAll = document.getElementById("checkAll");
checkAll.addEventListener("change", checkBoxChanged);


let TotGondolas = 0;
function gondolas() {
  fetch(`/dashboardRoutes/gondolas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO gondolas()!");

    if (resposta.ok) {
      resposta.json().then((json) => {
        console.log(json.gondolas, json.prateleiras, json.sensores)

        TotGondolas = json.gondolas;
        prateleiras = json.prateleiras;
        sensores = json.sensores;
        var gondolasVazias_ = TotGondolas - 1;

        gondolasVazias.innerHTML = `Gôndolas Vazias (Limpeza): ${gondolasVazias_}`;

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Limpar qualquer conteúdo existente

        for (let index = 0; index < TotGondolas; index++) {
          let divGondola = document.createElement('div');
          divGondola.className = 'item current-item';

          // Cria o primeiro botão
          let button1 = document.createElement('button');
          if (index == 0) {
            button1.className = 'card contains';
            }else{
            button1.className = 'card empty';
          }
          button1.textContent = `Gôndola ${index + 1}`;


          // Adiciona evento de clique ao primeiro botão
          button1.addEventListener('click', () => {
            window.location.href = `tela3reserva.html?gondola=${index + 1}`;
            sessionStorage.GondolaAtual = button1.textContent;
          });


          divGondola.appendChild(button1);

          // Adiciona o segundo botão, se ainda houver gôndolas restantes
          if (index + 1 < TotGondolas) {
            index++; // Incrementa o índice para o segundo botão
            let button2 = document.createElement('button');
            button2.className = 'card empty';
            button2.textContent = `Gôndola ${index + 1}`;
            

            divGondola.appendChild(button2);
          }

          gallery.appendChild(divGondola);
        }

        // Atualizar a lista de itens após adicionar gôndolas ao DOM
        items = document.querySelectorAll(".item");
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}

// Chame a função gondolas() para inicializar os itens
gondolas();

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    let isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    const maxItems = Math.ceil(TotGondolas / 2);

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    // Verificar se o item atual existe antes de chamar scrollIntoView e adicionar a classe
    if (items[currentItem]) {
      items[currentItem].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });

      items[currentItem].classList.add("current-item");
    }
  });
});


