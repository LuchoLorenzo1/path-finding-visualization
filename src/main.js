import animar from './animar.js'
import dijkstra from './algorithms/dijkstra.js'
import { crearGrilla, clearStylesGrilla, cambiarCelda } from './grilla.js'

const pesoDefault = 1
const algorithms = ["Dijkstra", "DFS", "BFS", "A*"]
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
	const selector = document.getElementById("select-algorithm")
	for (let i = 0; i < algorithms.length; i++) {
		const option = document.createElement("option")
		option.value = i;
		option.innerText = algorithms[i];
		selector.appendChild(option)
	}
})

document.getElementById('start-algorithm').addEventListener('click', () => {
	clearStylesGrilla(N, M, pesos, origen, destino)
	const selector = document.getElementById("select-algorithm")
	let resultado;
	switch (+selector.value) {
		case 0:
			resultado = dijkstra(pesos, origen, destino)
			break;
		case 1:
			resultado = dfs(pesos, origen, destino)
			break;
		case 2:
			resultado = bfs(pesos, origen, destino)
			break;
		case 3:
			resultado = aStar(pesos, origen, destino)
			break;
		default:
			break;
	}
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
  e.target.innerText = nPeso
	cambiarCelda(e.target, 'pesado')
})

