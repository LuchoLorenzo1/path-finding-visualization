import { cambiarCelda } from './grilla.js'
// import Context from './context'
// let { state } = Context

export default function animar(visitados, camino) {
  let speed = 5
  let timeout = 0

  for (let i = 1; i < visitados.length - 1; i++) {
    timeout += speed
    let e = document.getElementById(visitados[i])

		// console.log("HOLA")
		// console.log(e)
    setTimeout(() => {
      cambiarCelda(e, 'visitados')
    }, timeout)
  }

  for (let i = 1; i < camino.length; i++) {
    let e = document.getElementById(camino[i])
    setTimeout(() => {
      cambiarCelda(e, 'path')
    }, timeout)
    timeout += speed
  }

  setTimeout(() => {
    window.animating = false
    window.isClean = false
  }, timeout)
}
