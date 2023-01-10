// TODO:
// * Dragging objects after algorithm finished. (partly done)
// * A*, dfs, bfs
// * add option for adding weighted cells
// * terrain (weighted grass, water, sand, etc.) and recursive maze generator
// * add loading animation

import {dijkstra, aStar, dfs} from './algorithms/algorithms.js'
import animar from './animar.js'
import { crearGrilla, cambiarCelda, cleanGrid, } from './grilla.js'

import Context from './context'
const { state } = Context

const pesoDefault = 1
const algorithms = new Map([['Dijkstra', dijkstra], ['A*', aStar], ['dfs', dfs]])

window.addEventListener('load', () => {
	state.set('speed', 5)
	state.set('N', 0)
	state.set('M', 0)
	state.set('origin', '0:1')
	state.set('destination', '0:0')
	state.set('animating', false)
	state.set('isClean', true)

  crearGrilla()

	const selector = document.getElementById("select-algorithm")
  algorithms.forEach((_, key) => {
    const option = document.createElement('option')
    option.value = key
    option.innerText = key
    selector.appendChild(option)
  })
})

window.addEventListener('click', () => {})

// window.addEventListener('resize', () => {
// resizeGrilla()
// })

const grilla = document.getElementById('grilla')

let mousedown = -1
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

  mousedown = e.button
	if(mousedown == 0){
		e.target.setAttribute('weight', Infinity)
		cambiarCelda(e.target, 'wall')
	} else if(mousedown == 2){
		e.target.setAttribute("weight", pesoDefault)
		cambiarCelda(e.target, 'vacio')
	}
})

window.addEventListener('mouseup', () => {
  mousedown = -1
})

grilla.addEventListener('mouseover', (e) => {
  const id = e.target.id
  if (
    state.get('animating') ||
    !e.target.classList.contains('celda') ||
    id == state.get('origin') ||
    id == state.get('destination') ||
    mousedown == -1
  )
    return

	if(mousedown == 0){
		e.target.setAttribute('weight', Infinity)
		cambiarCelda(e.target, 'wall')
	} else if(mousedown == 2){
		e.target.setAttribute("weight", pesoDefault)
		cambiarCelda(e.target, 'vacio')
	}
})

document.getElementById('clean-grilla').addEventListener('click', () => {
  if (state.get('animating')) return
  cleanGrid(true)
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

	e.target.setAttribute("weight", pesoDefault)
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
  const resultado = algorithms.get(selector.value)()

  if (!resultado) {
    state.set('animating', false)
    return
  }

  animar(resultado[0], resultado[1])
}
