import { cambiarCelda } from './grilla.js'
import Context from './context'
let { state } = Context

export default function animar(visitados, camino) {
  // let speed = state.get("animatingSpeed")
  let speed = 5
  let timeout = 0

  for (let i = 1; i < visitados.length - 1; i++) {
    timeout += speed
    let e = document.getElementById(visitados[i])
    setTimeout(() => {
      cambiarCelda(e, 'visitados')
    }, timeout)
  }

	timeout += 1000;

  for (let i = 1; i < camino.length; i++) {
    let e = document.getElementById(camino[i])
    setTimeout(() => {
      cambiarCelda(e, 'path')
    }, timeout)
    timeout += speed
  }

	console.log("durante animar")
	console.log("animating ", state.get("animating"), "isClean", state.get("isClean"))

  setTimeout(() => {
		state.set("animating", false)
		state.set("isClean", false)
  }, timeout)
}
