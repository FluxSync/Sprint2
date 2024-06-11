const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;
let gondolasVazias = document.getElementById('gondolasVazias')


controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });

    items[currentItem].classList.add("current-item");
  });
});

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

function gondolas() {
  fetch(`/dashboardRoutes/gondolas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO gondolas()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.TotalGondolas, json.gondolasVazias)

        var gondolas = json.TotalGondolas;
        var gondolasVazias_ = json.gondolasVazias;

        console.log(gondolas, gondolasVazias)
        gondolasVazias.innerHTML = `Gôndolas Vazias(Limpeza): ${gondolasVazias_}`


        for (let index = 0; index < gondolas; index++) {
          let mensagemDiv = document.createElement('div');

          
        }




      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
} 

document.getElementById(`container_msg_others`).appendChild(mensagemDiv);

// let mensagemDiv = document.createElement('div');
// let dobra = mensagem.dobra;
// let foto = mensagem.foto;
// let idforum = mensagem.idForum



// if (id == mensagem.idUsuario) {
//   mensagemDiv.innerHTML = `
//     <div class="box_msg usersMsg">
//         <div class="content-high-msg">
//             <div class="usuario-msg">
//                 <div class="foto_msg"></div>
//                 <div class="txtNameUsuario">${mensagem.nome}</div>
//             </div>
//             <div class="msg-usuario">
//             <textarea id="idForum_${idforum}" class="txt-usuario" disabled maxlength="240">${mensagem.mensagem}</textarea>
//             </div>
//         </div>
//         <div class="content-low-msg">
//             <div class="content-hora">${mensagem.hora}</div>
//             <div class="content-day">${mensagem.data}</div>
//             <div class="content-btn-msg">
//             <div style="display: none;" onclick="fecharForum(${idforum})" class="btn-msg material-symbols-outlined fechar_${idforum}">arrow_back</div>
//             <div style="display: none;" onclick="atualizarForum(${idforum})" class="btn-msg material-symbols-outlined atualizar_${idforum}">check</div>
//             <div onclick="editarForum(${idforum})" class="btn-msg material-symbols-outlined editar_${idforum}">edit </div>
//             <div onclick="deletarForum(${idforum})" class="btn-msg material-symbols-outlined deletar_${idforum}">delete </div>
//             </div>
//         </div>
//     </div>
// `;
// }else{
//   mensagemDiv.innerHTML = `
//     <div class="box_msg usersMsg">
//         <div class="content-high-msg">
//             <div class="usuario-msg">
//                 <div class="foto_msg"></div>
//                 <div class="txtNameUsuario">${mensagem.nome}</div>
//             </div>
//             <div class="msg-usuario">
//             <textarea class="txt-usuario" disabled maxlength="240">${mensagem.mensagem}</textarea>
//             </div>
//         </div>
//         <div class="content-low-msg">
//             <div class="content-hora">${mensagem.hora}</div>
//             <div class="content-day">${mensagem.data}</div>
//             <div class="content-btn-msg">
//             </div>
//         </div>
//     </div>
// `;
