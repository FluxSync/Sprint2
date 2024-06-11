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

      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
} 
