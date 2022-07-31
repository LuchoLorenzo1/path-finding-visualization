import dijkstra from './algorithms/dijkstra.js'
import animar from './animar.js'
import { crearGrilla, clearStylesGrilla } from './grilla.js'

// -- TODO: hacer que el camino no sea un array, y q sea el anterior nomas xd
const pesoDefault = 1

var N = 10
var M = 50
var origen = '0:0'
var destino = '5:5'

var pesos = []

for (let i = 0; i < N; i++) {
  let l = []
  for (let j = 0; j < M; j++) {
    l.push(pesoDefault)
  }
  pesos.push(l)
}

window.addEventListener('load', () => {
  crearGrilla(N, M)
  console.log(origen)
  document.getElementById(origen).style.background = 'green'
  document.getElementById(destino).style.background = 'blue'
})

document.getElementById('start-algorithm').addEventListener('click', () => {
  clearStylesGrilla(N, M, pesos, origen, destino)

  const resultado = dijkstra(pesos, origen, destino)
  console.log(resultado)

  if (!resultado) return
  console.log(resultado[0])
  console.log(resultado[1])
  animar(origen, destino, resultado[0], resultado[1])
})

window.addEventListener('contextmenu', (e) => {
  if (e.target.nodeName != 'TD') return

  e.preventDefault()
  let [x, y] = e.target.id.split(':')
  pesos[parseInt(x)][parseInt(y)] = Infinity
  // e.target.innerText = '∞'
  e.target.style.background = 'black'
  e.target.style.color = 'white'
})

document.getElementById('grilla').addEventListener('click', (e) => {
  if (e.target.id == origen || e.target.id == destino) {
		if(!moviendo){
			console.log("EMPEZANDO A MOVER")
			moviendo = e.target.id
		}
		return;
	}
	let [x, y] = e.target.id.split(':')
	x = parseInt(x)
	y = parseInt(y)

	if(moviendo != undefined){
		document.getElementById(moviendo).style.background = 'white'
		if(moviendo == origen){
			origen = e.target.id
			e.target.style.background = 'green'
		} else if(moviendo == destino){
			destino = e.target.id
			e.target.style.background = 'blue'
		}
		moviendo = undefined
		return;
	}

  let nPeso = ++pesos[x][y]
  // e.target.innerText = nPeso
  e.target.style.background = `rgb(${200 - 10 * nPeso},${
    200 - 10 * nPeso
  },${100})`
})
