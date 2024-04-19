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

function tela2(params) {
  let setorSelecionado = select_setor.value;
  if (setorSelecionado) {
    var novaPagina = "tela2.html";
    window.location.href = novaPagina;
  } else {
    alert("Selecione um Setor");
  }
}
