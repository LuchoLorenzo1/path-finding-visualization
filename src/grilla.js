import Context from './context'
const { state } = Context

const M = 40
const pesoDefault = 1

export function cambiarCelda(element, class_) {
  if (!element) return
  element.classList.remove(element.classList[1])
  element.classList.add(class_)
}

export function crearGrilla() {
  const grilla = document.getElementById('grilla')
  let viewportWidth = window.innerWidth
  let viewportHeight = window.innerHeight

  let W = viewportWidth / M
  if (W < 20) W = 20
  const N = Math.floor(viewportHeight / W)

	state.set('N', N)
	state.set('M', M)

	const origin = `${Math.floor(N / 2)}:2`
	const destination =`${Math.floor(N / 2)}:${M - 3}`

  state.set('origin', origin)
  state.set('destination', destination)

  grilla.innerHTML = ''
  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr')

    for (let j = 0; j < M; j++) {
      const td = document.createElement('td')
      // const content = document.createTextNode('')

      td.classList.add('celda','vacio')
      td.setAttribute('id', `${i}:${j}`)
      td.setAttribute('weight', pesoDefault)
      // td.appendChild(content)
      tr.appendChild(td)
    }
    tr.classList.add('fila')
    grilla.appendChild(tr)
  }

  let o = document.getElementById(origin)
  let d = document.getElementById(destination)
  cambiarCelda(o, 'origen')
  cambiarCelda(d, 'destino')
  o.setAttribute('draggable', true)
  d.setAttribute('draggable', true)

}

export function resizeGrilla() {
	console.log("resize")
}

export function cleanGrid(cleanAll) {

  document.getElementById('grilla').childNodes.forEach((fila) => {
		fila.childNodes.forEach((celda) => {
			if (cleanAll){
				cambiarCelda(celda, 'vacio')
				celda.setAttribute("weight", pesoDefault)
			}
			if (!celda.classList.contains('wall'))  {
					cambiarCelda(celda, 'vacio')
					celda.setAttribute("weight", pesoDefault)
			}
		})
	})

  setObjects()
	state.set("isClean", true)
}

function setObjects() {
  let o = document.getElementById(state.get("origin"))
  let d = document.getElementById(state.get("destination"))
  cambiarCelda(o, 'origen')
  cambiarCelda(d, 'destino')
  o.setAttribute('draggable', true)
  d.setAttribute('draggable', true)
}
