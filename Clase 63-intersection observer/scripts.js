const boxes = document.querySelectorAll('.box')//seleccionamos todos los lementos con la clase box

const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(entry.target.id, 'is intersecting')
        }
    })
}

const options = {
    // root:
    // rootMargin: '-200px'//segun la cantidad de pixeles de margen, se tiene en cuenta la intercepcion con el elemento.
    threshold: 0.25//recibe valor entre 0 y 1, tiene en cuenta el porcentaje de el elemento que esta siendo interceptado antes de ejecutarse
}                   //en este caso es 25%

const observer = new IntersectionObserver(callback, options)//callback es la funcion que se ejecuta cuando se observa el elemento
boxes.forEach(element => observer.observe(element))