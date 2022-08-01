import animar from './animar.js'
import dijkstra from './algorithms/dijkstra.js'
import { crearGrilla, clearStylesGrilla, cambiarCelda } from './grilla.js'

const pesoDefault = 1
const algorithms = ["Dijkstra", "DFS", "BFS", "A*"]
var N = 5
var M = 50
var origen = `${Math.floor(N/2)}:2`
var destino = `${Math.floor(N/2)}:${M-3}`
var pesos = []
var objetos = ["origen", "destino"]


window.addEventListener('load', () => {
  crearGrilla(N, M, origen, destino)
	for (let i = 0; i < N; i++) {
		let l = []
		for (let j = 0; j < M; j++) {
			l.push(pesoDefault)
		}
		pesos.push(l)
	}
	const selector = document.getElementById("select-algorithm")
	for (let i = 0; i < algorithms.length; i++) {
		const option = document.createElement("option")
		option.value = i;
		option.innerText = algorithms[i];
		selector.appendChild(option)
	}
})

const grilla = document.getElementById('grilla')

grilla.addEventListener('click', (e) => {
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

grilla.addEventListener('contextmenu', (e) => {
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

function moveObject(element, objectId) {
	if(!element) return
	switch (objectId) {
		case 'origen':
			let o = document.getElementById(origen)
			o.setAttribute('draggable', false)
			cambiarCelda(o, "vacio")
			cambiarCelda(element, "origen")
			origen = element.id;
			break;
		case 'destino':
			let d= document.getElementById(destino)
			d.setAttribute('draggable', false)
			cambiarCelda(d, "vacio")
			cambiarCelda(element, "destino")
			destino = element.id
			break;
		default:
			break;
	}
	element.setAttribute('draggable', true)
}

grilla.addEventListener('dragstart', (e)=> {
  if(e.target.id == origen){
		e.dataTransfer.setData('dragging', 'origen');
	} else if(e.target.id == destino){
		e.dataTransfer.setData('dragging', 'destino');
	} else {
		return
	}
})


grilla.addEventListener('dragenter', (e) => {
	e.preventDefault();
	e.target.classList.add("droppable")
	// console.log("dragenter")
})
grilla.addEventListener('dragover', (e) => {
	e.preventDefault();
	// console.log("dragover")
})
grilla.addEventListener('dragleave', (e) => {
	e.preventDefault();
	e.target.classList.remove("droppable")
	console.log("dragleave")
})

grilla.addEventListener('drop', (e) => {
	console.log("DROP")
	const dragging = e.dataTransfer.getData('dragging');
	moveObject(e.target, dragging)
})
grilla.addEventListener('dragend', (e) => {
	console.log("DRAGEND")
	// e.preventDefault()
	// cambiarCelda(document.getElementById(e.destino), "destino")

})


document.getElementById('start-algorithm').addEventListener('click', () => {
	clearStylesGrilla(N, M, pesos, origen, destino)
	const selector = document.getElementById("select-algorithm")
	let resultado;
	switch (+selector.value) {
		case 0:
			resultado = dijkstra(pesos, origen, destino)
			break;
		// case 1:
			// resultado = dfs(pesos, origen, destino)
			// break;
		// case 2:
			// resultado = bfs(pesos, origen, destino)
			// break;
		// case 3:
			// resultado = aStar(pesos, origen, destino)
			// break;
		// default:
			// break;
	}
  if (!resultado) return
  animar(resultado[0], resultado[1])
})

