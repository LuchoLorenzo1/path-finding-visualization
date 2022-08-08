// TODO:
// * Create layout and config menu
// * Draging objects after algorithm finished. (partly done)
// * A*, dfs, bfs
// * add option for adding weighted cells
// * terrain (weighted grass, water, sand, etc.) and recursive maze generator
// * improve keyframes animation

import dijkstra from './algorithms/dijkstra.js'
import animar from './animar.js'
import {
  crearGrilla,
  // resizeGrilla,
  cambiarCelda,
  cleanGrid,
} from './grilla.js'
import Context from './context'
let { state } = Context

const pesoDefault = 1
const algorithms = new Map([['Dijkstra', dijkstra]])
window.N = 0
window.M = 0
window.origen = undefined
window.destino = undefined
var pesos = []
window.animating = false
window.isClean = true

window.addEventListener('load', () => {
  [N, M, origen, destino] = crearGrilla(origen, destino)
  for (let i = 0; i < N; i++) {
    let l = []
    for (let j = 0; j < M; j++) {
      l.push(pesoDefault)
    }
    pesos.push(l)
  }
  const selector = document.getElementById('select-algorithm')
  algorithms.forEach((_, key) => {
    const option = document.createElement('option')
    option.value = key
    option.innerText = key
    selector.appendChild(option)
  })
})

// window.addEventListener('resize', () => {
// resizeGrilla(pesos, origen, destino, N)
// })

const grilla = document.getElementById('grilla')

let mousedown = false
grilla.addEventListener('mousedown', (e) => {
  if (window.animating || e.target.id == origen || e.target.id == destino)
    return

  if (!window.isClean) {
    cleanGrid()
  }

  mousedown = true
  let [x, y] = e.target.id.split(':')
  pesos[+x][+y] = Infinity
  cambiarCelda(e.target, 'wall')
})
window.addEventListener('mouseup', () => {
  mousedown = false
})
grilla.addEventListener('mouseover', (e) => {
  if (window.animating || e.target.id == origen || e.target.id == destino)
    return
  if (!mousedown) return
  let [x, y] = e.target.id.split(':')
  pesos[+x][+y] = Infinity
  cambiarCelda(e.target, 'wall')
})

document.getElementById('clean-grilla').addEventListener('click', () => {
  if (window.animating) return
  cleanGrid(true)
  pesos = []
  for (let i = 0; i < N; i++) {
    let l = []
    for (let j = 0; j < M; j++) {
      l.push(pesoDefault)
    }
    pesos.push(l)
  }

  window.isClean = true
})

grilla.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  if (window.animating) return
  if (e.target.id == origen || e.target.id == destino) return
  let [x, y] = e.target.id.split(':')
  pesos[+x][+y] = pesoDefault
  cambiarCelda(e.target, 'vacio')
})

function moveObject(element, objectId) {
  if (!element) return
  switch (objectId) {
    case 'origen':
      let o = document.getElementById(origen)
      o.setAttribute('draggable', false)
      cambiarCelda(o, 'vacio')
      cambiarCelda(element, 'origen')
      origen = element.id
      break
    case 'destino':
      let d = document.getElementById(destino)
      d.setAttribute('draggable', false)
      cambiarCelda(d, 'vacio')
      cambiarCelda(element, 'destino')
      destino = element.id
      break
    default:
      break
  }
  element.setAttribute('draggable', true)
}

grilla.addEventListener('dragstart', (e) => {
  if (window.animating) return
  if (e.target.id == origen) {
    e.dataTransfer.setData('dragging', 'origen')
  } else if (e.target.id == destino) {
    e.dataTransfer.setData('dragging', 'destino')
  } else {
    return
  }
})
grilla.addEventListener('dragenter', (e) => {
  e.preventDefault()
  if (
    window.animating ||
    e.target.id == origen ||
    e.target.id == destino ||
    e.target.classList.contains('wall') ||
    e.target.nodeName != 'TD'
  )
    return
  e.target.classList.add('droppable')
})
grilla.addEventListener('dragover', (e) => {
  e.preventDefault()
  if (window.animating) return
})

grilla.addEventListener('dragleave', (e) => {
  e.preventDefault()
  if (e.target.id == origen || e.target.id == destino) return
  e.target.classList.remove('droppable')
})
grilla.addEventListener('drop', (e) => {
  if (
    window.animating ||
    e.target.id == origen ||
    e.target.id == destino ||
    e.target.classList.contains('wall') ||
    e.target.nodeName != 'TD'
  )
    return
  const dragging = e.dataTransfer.getData('dragging')

  e.target.classList.remove('droppable')
  moveObject(e.target, dragging)
  if (dragging == 'origen' && !isClean) startAlgorithm()
})
// grilla.addEventListener('dragend', (e) => {
// })

document.getElementById('start-algorithm').addEventListener('click', () => {
  startAlgorithm()
})

function startAlgorithm() {
  if (window.animating) return
  window.animating = true
  if (!window.isClean) cleanGrid()
  const selector = document.getElementById('select-algorithm')
  const resultado = algorithms.get(selector.value)(pesos, origen, destino)

  if (!resultado) {
    window.animating = false
    return
  }

  animar(resultado[0], resultado[1])
}

// grilla.addEventListener('touchstart', (e) => {
// })
// grilla.addEventListener('touchmove', (e) => {
//   // e.preventDefault()
// 	// if(e.target.id == origen || e.target.id == destino || e.target.classList.contains("wall") || e.target.nodeName != "TD") return
//   // e.target.classList.add('droppable')
// })
// grilla.addEventListener('touchcancel', (e) => {
//   // e.preventDefault()
// 	// if(e.target.id == origen || e.target.id == destino) return
//   // e.target.classList.remove('droppable')
// })
// grilla.addEventListener('touchend', (e) => {
// 	if(e.target.id == origen || e.target.id == destino || e.target.classList.contains("wall") || e.target.nodeName != "TD") return
// })
