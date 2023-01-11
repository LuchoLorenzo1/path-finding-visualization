// TODO:
// * Dragging objects after algorithm finished. (partly done)
// * A*, dfs, bfs
// * add option for adding weighted cells
// * terrain (weighted grass, water, sand, etc.) and recursive maze generator
// * add loading animation

import { dijkstra, aStar, dfs } from './algorithms/algorithms.js'
import { createGrid, cleanGrid, animate } from './grid.js'

import Context from './context'
const { state } = Context

const algorithms = new Map([
	['Dijkstra', dijkstra],
	['A*', aStar],
	['dfs', dfs],
])

window.addEventListener('load', () => {
	state.set('speed', 4)
	state.set('N', 100)
	state.set('M', 100)
	state.set('origin', [0,1])
	state.set('destination', [0,0])
	state.set('animating', false)
	state.set('isClean', true)
	state.set('selectedWeight', Infinity)

	createGrid(state.get('N'), state.get('M'))

	const selector = document.getElementById('select-algorithm')
	algorithms.forEach((_, key) => {
		const option = document.createElement('option')
		option.value = key
		option.innerText = key
		selector.appendChild(option)
	})
})

document.getElementById('run').addEventListener('click', () => {
	startAlgorithm()
})

const startAlgorithm = () => {
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

	animate(resultado[0], resultado[1])
}
