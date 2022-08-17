// TODO:
// * Dragging objects after algorithm finished. (partly done)
// * A*, dfs, bfs
// * add option for adding weighted cells
// * terrain (weighted grass, water, sand, etc.) and recursive maze generator
// * add loading animation

import dijkstra from './algorithms/dijkstra.js'
import animar from './animar.js'
import {
  crearGrilla,
  // resizeGrilla,
  cambiarCelda,
  cleanGrid,
} from './grilla.js'

import Context from './context'
const { state } = Context

const pesoDefault = 1
const algorithms = new Map([['Dijkstra', dijkstra]])

state.set('speed', 5)
state.set('N', 0)
state.set('M', 0)
state.set('origin', '0:1')
state.set('destination', '0:0')
state.set('animating', false)
state.set('isClean', true)

document.getElementById('algorithm-speed-input').onchange = (e) => {
		state.set('speed', e.target.value)
}

var pesos = []

window.addEventListener('load', () => {
  crearGrilla()

  for (let i = 0; i < state.get('N'); i++) {
    let l = []
    for (let j = 0; j < state.get('M'); j++) {
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

window.addEventListener('click', () => {})

// window.addEventListener('resize', () => {
// resizeGrilla(pesos, origen, destino, N)
// })

const grilla = document.getElementById('grilla')

let mousedown = false
grilla.addEventListener('mousedown', (e) => {
  if (
    state.get('animating') ||
    e.target.id == state.get('origin') ||
    e.target.id == state.get('destination')
  )
    return

  if (!state.get('isClean')) {
    cleanGrid()
  }

  mousedown = true
  const [x, y] = e.target.id.split(':')
  pesos[+x][+y] = Infinity
  cambiarCelda(e.target, 'wall')
})
window.addEventListener('mouseup', () => {
  mousedown = false
})

grilla.addEventListener('mouseover', (e) => {
  const id = e.target.id
  if (
    state.get('animating') ||
    !e.target.classList.contains('celda') ||
    id == state.get('origin') ||
    id == state.get('destination') ||
    !mousedown
  )
    return

  let [x, y] = id.split(':')
  pesos[+x][+y] = Infinity
  cambiarCelda(e.target, 'wall')
})

document.getElementById('clean-grilla').addEventListener('click', () => {
  if (state.get('animating')) return
  cleanGrid(true)
  pesos = []

  const N = state.get('N')
  const M = state.get('M')
  for (let i = 0; i < N; i++) {
    let l = []
    for (let j = 0; j < M; j++) {
      l.push(pesoDefault)
    }
    pesos.push(l)
  }

  state.set('isClean', true)
})

grilla.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  if (
    state.get('animating') ||
    e.target.id == state.get('origin') ||
    e.target.id == state.get('destination')
  )
    return

  let [x, y] = e.target.id.split(':')
  pesos[+x][+y] = pesoDefault
  cambiarCelda(e.target, 'vacio')
})

function moveObject(element, object) {
  if (!element) return
  switch (object) {
    case 'origen':
      let o = document.getElementById(state.get('origin'))
      o.setAttribute('draggable', false)
      cambiarCelda(o, 'vacio')
      cambiarCelda(element, 'origen')
      state.set('origin', element.id)
      break
    case 'destino':
      let d = document.getElementById(state.get('destination'))
      d.setAttribute('draggable', false)
      cambiarCelda(d, 'vacio')
      cambiarCelda(element, 'destino')
      state.set('destination', element.id)
      break
    default:
      break
  }
  element.setAttribute('draggable', true)
}

grilla.addEventListener('dragstart', (e) => {
  if (state.get('animating')) return
  if (e.target.id == state.get('origin')) {
    e.dataTransfer.setData('dragging', 'origen')
  } else if (e.target.id == state.get('destination')) {
    e.dataTransfer.setData('dragging', 'destino')
  } else {
    return
  }
})

grilla.addEventListener('dragenter', (e) => {
  e.preventDefault()
  const id = e.target.id
  if (
    state.get('animating') ||
    e.target.classList.contains('wall') ||
    !e.target.classList.contains('celda') ||
    id == state.get('origin') ||
    id == state.get('destination')
  )
    return

  e.target.classList.add('droppable')
})

grilla.addEventListener('dragover', (e) => {
  e.preventDefault()
  if (state.get('animating')) return
})

grilla.addEventListener('dragleave', (e) => {
  e.preventDefault()
  if (
    e.target.id == state.get('origin') ||
    e.target.id == state.get('destination')
  )
    return
  e.target.classList.remove('droppable')
})
grilla.addEventListener('drop', (e) => {
  const id = e.target.id
  if (
    state.get('animating') ||
    e.target.classList.contains('wall') ||
    !e.target.classList.contains('celda') ||
    id == state.get('origin') ||
    id == state.get('destination')
  )
    return

  const dragging = e.dataTransfer.getData('dragging')

  e.target.classList.remove('droppable')
  moveObject(e.target, dragging)
  if (!state.get('isClean')) {
    startAlgorithm()
  }
})

// grilla.addEventListener('dragend', (e) => {
// })

document.getElementById('run').addEventListener('click', () => {
  startAlgorithm()
})

function startAlgorithm() {
  if (state.get('animating')) return
  state.set('animating', true)

  if (!state.get('isClean')) {
    cleanGrid()
  }

  const selector = document.getElementById('select-algorithm')
  const resultado = algorithms.get(selector.value)(pesos)

  if (!resultado) {
    state.set('animating', false)
    return
  }

  animar(resultado[0], resultado[1])
}
