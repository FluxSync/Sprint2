var ObservandoElementos = new IntersectionObserver((entrada) => {

    entrada.forEach((entre) => {
        console.log(entrada)
        if(entre.isIntersecting === true) {
            entre.target.classList.add('show')
        }
        else {
            entre.target.classList.remove('show')
        }

    }) 
})

var elementosInvisiveis = document.querySelectorAll('.invisivel')

elementosInvisiveis.forEach((elemento) => ObservandoElementos.observe(elemento))

