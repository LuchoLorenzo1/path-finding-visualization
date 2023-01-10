import { visitCell, makePathCell } from './grilla.js'
import Context from './context'
let { state } = Context

export default function animar(visitados, camino) {
  const speed = +state.get("speed")
  // let speed = 5
  let timeout = 0

  for (let i = 1; i < visitados.length - 1; i++) {
    timeout += speed
    let e = document.getElementById(visitados[i])
    setTimeout(() => {
      visitCell(e)
    }, timeout)
  }

	timeout += 1000;

  for (let i = 0; i < camino.length; i++) {
    let e = document.getElementById(camino[i])
    setTimeout(() => {
      makePathCell(e)
    }, timeout)
    timeout += speed
  }

  setTimeout(() => {
		state.set("animating", false)
		state.set("isClean", false)
  }, timeout)
}
