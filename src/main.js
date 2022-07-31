import animar from './animar.js'
import dijkstra from './algorithms/dijkstra.js'
import { crearGrilla, clearStylesGrilla, cambiarCelda } from './grilla.js'

// -- TODO: hacer que el camino no sea un array, y q sea el anterior nomas xd
const pesoDefault = 1

var N = 10
var M = 50
var origen = `${Math.floor(N/2)}:2`
var destino = `${Math.floor(N/2)}:${M-3}`

var moviendo;

var pesos = []

for (let i = 0; i < N; i++) {
  let l = []
  for (let j = 0; j < M; j++) {
    l.push(pesoDefault)
  }
  pesos.push(l)
}

window.addEventListener('load', () => {
  crearGrilla(N, M, origen, destino)
})

document.getElementById('start-algorithm').addEventListener('click', () => {
  clearStylesGrilla(N, M, pesos, origen, destino)
  const resultado = dijkstra(pesos, origen, destino)
  if (!resultado) return
  animar(resultado[0], resultado[1])
})

document.getElementById('clean-grilla').addEventListener('click', () => {
  crearGrilla(N, M, origen, destino)
	pesos = []
	for (let i = 0; i < N; i++) {
	  let l = []
	  for (let j = 0; j < M; j++) {
		l.push(pesoDefault)
	  }
	  pesos.push(l)
	}
})

window.addEventListener('contextmenu', (e) => {
  if (e.target.nodeName != 'TD') return

  e.preventDefault()
  let [x, y] = e.target.id.split(':')
	if(pesos[+x][+y] != Infinity){
		pesos[+x][+y] = Infinity;
		cambiarCelda(e.target, "wall")
		// e.target.innerText = '∞'
	} else {
		pesos[+x][+y] = pesoDefault;
		cambiarCelda(e.target, "vacio")
	}
})


document.getElementById('grilla').addEventListener('click', (e) => {
  if (e.target.id == origen || e.target.id == destino) {
		if(!moviendo){
			moviendo = e.target.id
		}
		return;
	}

	let [x, y] = e.target.id.split(':')
	x = +x
	y = +y

	if(moviendo != undefined){
		cambiarCelda(document.getElementById(moviendo),'vacio')
		pesos[x][y] = pesoDefault
		if(moviendo == origen){
			origen = e.target.id
		  cambiarCelda(e.target, 'origen')
		} else if(moviendo == destino){
			destino = e.target.id
		  cambiarCelda(e.target, 'destino')
		}
		moviendo = undefined
		return;
	}

  let nPeso = ++pesos[x][y]
  // e.target.innerText = nPeso
  e.target.style.background = `rgb(${200 - 10 * nPeso},${200 - 10 * nPeso },${100})`
})

