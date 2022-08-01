import animar from './animar.js'
import dijkstra from './algorithms/dijkstra.js'
import { crearGrilla, clearStylesGrilla, cambiarCelda } from './grilla.js'

const pesoDefault = 1
const algorithms = ["Dijkstra", "DFS", "BFS", "A*"]
var N = 20
var M = 50
var origen = `${Math.floor(N/2)}:2`
var destino = `${Math.floor(N/2)}:${M-3}`

var pesos = []
for (let i = 0; i < N; i++) {
  let l = []
  for (let j = 0; j < M; j++) {
    l.push(pesoDefault)
  }
  pesos.push(l)
}

window.addEventListener('load', () => {
  let startTime= performance.now()
  crearGrilla(N, M, origen, destino)
	const selector = document.getElementById("select-algorithm")
	for (let i = 0; i < algorithms.length; i++) {
		const option = document.createElement("option")
		option.value = i;
		option.innerText = algorithms[i];
		selector.appendChild(option)
	}
  var endTime = performance.now()
	console.log(`CREAR GRILLA : ${ (endTime- startTime) / 1000 }s`)
})

document.getElementById('grilla').addEventListener('click', (e) => {
  if (e.target.id == origen || e.target.id == destino) {
			return;
	}
	let [x, y] = e.target.id.split(':')
  let nPeso = ++pesos[+x][+y]
  e.target.innerText = nPeso
	cambiarCelda(e.target, 'pesado')
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

document.getElementById('grilla').addEventListener('contextmenu', (e) => {
	e.preventDefault()
	if (e.target.id == origen || e.target.id == destino) return

  let [x, y] = e.target.id.split(':')
	if(pesos[+x][+y] != Infinity){
		pesos[+x][+y] = Infinity;
		cambiarCelda(e.target, "wall")
	} else {
		pesos[+x][+y] = pesoDefault;
		cambiarCelda(e.target, "vacio")
	}
})

document.getElementById('grilla').addEventListener('dragstart', (e)=> {
  if(e.target.id == origen){
		e.dataTransfer.setData('dragging', 'origen');
	} else if(e.target.id == destino){
		console.log(e.dataTransfer.setData)
		e.dataTransfer.setData('dragging', 'destino');
	}
	// e.dataTransfer.setDragImage(e.target, window.outerWidth, window.outerHeight);
})


document.getElementById('grilla').addEventListener('dragenter', (e) => {
	e.preventDefault();
	// if(e.target.id == destino || e.target.id == origen) return;
})

document.getElementById('grilla').addEventListener('dragover', (e) => {
	e.preventDefault();
})

document.getElementById('grilla').addEventListener('drop', (e) => {
	const dragging = e.dataTransfer.getData('dragging');
	let iendo;
	if(dragging == 'origen'){
		iendo = document.getElementById(origen)
		origen = e.target.id
	} else if (dragging == 'destino')  {
		iendo = document.getElementById(destino)
		destino  = e.target.id
	}
	cambiarCelda(iendo, "vacio")
	cambiarCelda(e.target,dragging)
})


document.getElementById('start-algorithm').addEventListener('click', async () => {
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
