
/*Função IntersectionObserver - Está observando todos os elementos da página, desde div a imagens e cria uma lista com os elementos chamada
entrada. */
var ObservandoElementos = new IntersectionObserver((entrada) => {

/*Entre representa um elemento dentro da lista entrada*/
    entrada.forEach((entre) => {
        console.log(entrada)
        /* Se o intersecting for true, irá aparecer no inspecionar, e fazendo uma decisão, se ele for true, crie uma div "show" com o opacity 1*/
        if(entre.isIntersecting === true) {
            entre.target.classList.add('show')
        }
        /*Se o intersecting for false, remova a tag show*/
        else {
            entre.target.classList.remove('show')
        }

    }) 
})

/* Está pegando a class invisivel que deixa os elementos em opacity 0 no caso "invisivel" */
var elementosInvisiveis = document.querySelectorAll('.invisivel')

/* Observando cada elemento da tela "ForEach = Para Cada", para cada elemento ele observara,
 método observe é especifico da classe interSectionObject*/
 
elementosInvisiveis.forEach((elemento) => ObservandoElementos.observe(elemento))

