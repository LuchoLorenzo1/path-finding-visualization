import dijkstra from './algorithms/dijkstra.js'
import animar from './animar.js'
import { crearGrilla, clearStylesGrilla } from './grilla.js'

// -- TODO: hacer que el camino no sea un array, y q sea el anterior nomas xd
const pesoDefault = 1

var N = 11
var M = 50
var origen = '5:10'
var destino = '5:40'
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
  animar(origen, destino, resultado[0], resultado[1])
})

document.getElementById('clean-grilla').addEventListener('click', () => {
	console.log("origen antes de limpiar grilla:", origen)
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
  pesos[parseInt(x)][parseInt(y)] = Infinity
  // e.target.innerText = '∞'
	console.log(e.target.classList)
  e.target.classList.remove(e.target.classList[1])
	console.log(e.target.classList)
  e.target.classList.add("wall")
	console.log(e.target.classList)
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

function cambiarCelda(element, class_) {
  element.classList.remove(element.classList[1])
  e.target.classList.add(class_)
}
